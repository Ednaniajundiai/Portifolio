
# CT Alpha - Sistema de Termos de Consentimento de Saúde

## Resumo Executivo

**O que é:** Sistema web para registro e gestão de termos de consentimento de saúde e questionário PAR-Q (Physical Activity Readiness Questionnaire) para academias de **Jiu Jitsu** e **Muay Thai**, em conformidade com a **LGPD**.

**Problema que resolve:** Centralizar o fluxo de coleta de dados de saúde (PAR-Q), consentimento LGPD e uso de imagem, evitar duplicidade de consentimentos válidos, gerar e armazenar comprovantes (PDF), notificar o aluno por e-mail e manter trilha auditável (planilha, logs, integração N8N).

**Público-alvo:** Academias de artes marciais que precisam de termo de consentimento e questionário de prontidão física por aluno; administradores que consultam status e revogação; e alunos que preenchem o formulário e recebem confirmação/PDF por e-mail.

---

## Stack Tecnológica

| Camada | Tecnologia | Por que essa escolha? |
|--------|------------|------------------------|
| **Frontend** | HTML5, CSS3, JavaScript (vanilla) | Formulário multi-step com máscaras (CPF, telefone), validação no cliente e envio direto à API; sem framework para reduzir complexidade e deploy único com o backend. |
| **Backend** | FastAPI 0.109, Uvicorn | API assíncrona, validação com Pydantic, documentação automática (OpenAPI/Swagger), tipagem e performance adequadas para I/O (DB, e-mail, HTTP). |
| **Database** | SQLAlchemy 2.0 (async), SQLite (dev) / PostgreSQL (prod) | ORM async, migrations com Alembic, modelo claro (Student, HealthConsent) e troca de engine via `DATABASE_URL`. |
| **Auth** | — | Sem autenticação de usuário; foco em auditoria (IP, user-agent) e consentimento explícito LGPD. Autenticação de admin pode ser evolução (v2). |
| **PDF** | xhtml2pdf (pisa) + ReportLab | Geração de PDF a partir de HTML/CSS, reutilizando o mesmo template do e-mail; compatível com Windows e sem dependência de browser/Chromium. |
| **E-mail** | aiosmtplib | SMTP assíncrono; envio de confirmação com PDF anexo e aviso de expiração sem bloquear a request. |
| **Planilha** | Google Sheets API (Service Account) | Registro e atualização de status em planilha para auditoria e uso operacional; API bem documentada e credenciais via JSON. |
| **Integração / Automação** | N8N (webhook) + aiohttp | Webhook N8N recebe payload com dados do aluno e PDF em base64; o fluxo N8N faz o upload do PDF para o Google Drive e permite automações adicionais (notificações, CRM, etc.) sem alterar o backend. |
| **Config** | Pydantic Settings + python-dotenv | Configuração tipada, carregada de `.env`, com valores default e validação em um único ponto. |

**Papel do fluxo N8N (`parq-ctalpha-N8N.json`):** O backend envia ao webhook N8N um JSON com `name`, `email`, `phone`, `phone_raw`, `pdf.filename`, `pdf.data` (base64) e `metadata`. O fluxo N8N: (1) recebe o POST no webhook `ctalpha`, (2) mapeia campos no node "Edit Fields", (3) converte o base64 em binário no "Convert to File", (4) faz upload no Google Drive na pasta configurada. Assim, o Drive é alimentado pela automação N8N, e o backend não precisa de OAuth/Drive API.

---

## Arquitetura e Fluxo

**Arquitetura:** **Clean Architecture** com quatro camadas:

- **Domain:** entidades (`Student`, `HealthConsent`), enums (`ConsentStatus`), regras (validade 12 meses, revogação, expiração) e portas (repositórios e serviços em `domain/repositories.py` e `domain/services.py`).
- **Application:** casos de uso (`RegisterConsentUseCase`, `GetConsentStatusUseCase`, `RevokeConsentUseCase`, `CheckExpiredConsentsUseCase`) e schemas Pydantic; orquestram repositórios e serviços, sem detalhes de infra.
- **Infrastructure:** implementações de repositórios (SQLAlchemy), PDF (xhtml2pdf), e-mail (SMTP), Sheets, webhook N8N e logging; detalhes técnicos e APIs externas ficam aqui.
- **Interfaces:** API REST (FastAPI) em `interfaces/api/routes.py`; dependências injetadas em `dependencies.py` (repositórios, serviços, use cases).

**Fluxo dos dados (cliente → servidor):**

1. **Cliente:** formulário em `static/` (index.html + script.js) → máscaras e validação → `POST /api/v1/consent/register` com `CompleteRegistrationRequest` (student + consent no formato do questionário).
2. **API:** `register_consent` captura IP e User-Agent, monta `student_data`, `questionnaire_data` e `consent_data` (via `to_health_consent_dict()`).
3. **Use case:** `RegisterConsentUseCase.execute` faz: buscar/criar aluno por CPF → verificar consentimento válido existente → criar consentimento → gerar PDF → enviar e-mail → chamar webhook N8N → append no Sheets → log de sucesso; falhas em PDF/e-mail/webhook/Sheets/log não derrubam o registro (apenas log/print).
4. **Persistência:** repositórios SQLAlchemy gravam em `students` e `health_consents`; PDF em disco; Sheets e N8N atualizados em seguida.

Fluxo de leitura: `GET /api/v1/consent/status/{student_id}` e `GET /api/v1/consent/{consent_id}/pdf` usam os mesmos repositórios e entidades.

---

## Destaques Técnicos (Deep Dive)

### 1. Orquestração do registro e integração N8N com PDF em base64

O `RegisterConsentUseCase` coordena várias operações em sequência (get_or_create student, validação de consentimento duplicado, criação do consentimento, geração de PDF, e-mail, webhook, Sheets, logging). A decisão de **não falhar o registro** se e-mail, webhook ou Sheets falharem mantém o dado principal (aluno + consentimento + PDF local) consistente e permite reprocessar integrações depois. O **webhook N8N** recebe um payload enxuto construído em `N8NWebhookService._build_payload`: lê o PDF do disco, converte para base64, envia `name`, `email`, `phone`, `phone_raw`, `pdf.filename`, `pdf.data` e `metadata`. O fluxo N8N consome esse JSON e faz o upload do PDF no Drive, desacoplando storage secundário do backend.

### 2. Questionário PAR-Q consolidado e geração de PDF/e-mail

O frontend envia as 7 perguntas PAR-Q mais detalhes (quando “sim”) e observações. O schema `QuestionnaireConsentData` valida e o método `to_health_consent_dict()` monta uma string única `health_conditions` no formato "Questão X: SIM/NÃO" com linhas adicionais para detalhes e observações. Esse texto é usado pelo **xhtml2pdf** (template HTML/CSS) para gerar o PDF do termo e pelo **email_service** (template consent_term + formatação das questões no `_format_parq_questions`) para o corpo do e-mail e anexo. Ou seja: uma única representação do questionário serve tanto o PDF quanto o e-mail, garantindo consistência.

### 3. Atualização de status no Google Sheets e logging com mascaramento LGPD

No `GoogleSheetsAPIService.update_consent_status`, a planilha é lida (range `Registros!A:V`), a linha cujo primeiro valor é o `consent_id` é encontrada e as colunas de status e timestamp são atualizadas. Isso mantém a planilha alinhada a revogações e expirações feitas no sistema. O **ConsentLoggingService** usa loggers separados (sucesso vs erro), rotação diária (`TimedRotatingFileHandler`), e **mascaramento de dados sensíveis** (CPF, telefone, e-mail) nos logs, alinhado à LGPD e boas práticas de auditoria sem expor dados desnecessários em texto plano.

---

## Desafios e Soluções

| Desafio / trade-off | Solução adotada |
|---------------------|------------------|
| Múltiplas integrações (PDF, e-mail, N8N, Sheets) que podem falhar | Tratamento em try/except em cada etapa pós-PDF; apenas o núcleo (aluno + consentimento + PDF local) é crítico; falhas são logadas e não retornam erro 5xx ao cliente. |
| Armazenamento do PDF além do disco local | Uso do N8N como “ponte”: backend envia PDF em base64 no webhook; o fluxo N8N faz upload no Drive. Backend não precisa de OAuth nem da API do Drive. |
| Manter planilha consistente com revogação e expiração | `RevokeConsentUseCase` e `CheckExpiredConsentsUseCase` chamam `sheets_service.update_consent_status` após atualizar o banco; busca por `consent_id` na coluna A e atualização na mesma linha. |
| Formulário longo (dados pessoais + 7 perguntas + consentimentos) | Formulário em 3 etapas (dados pessoais → questionário → consentimento) com barra de progresso e validação por etapa no frontend; backend recebe um único payload já validado pelo Pydantic. |
| Logs e LGPD | Serviço de logging dedicado com mascaramento de CPF, telefone e e-mail nos eventos registrados. |

---

## Sugestões de Melhoria (Versão 2.0)

- **Dashboard administrativo:** telas para listar consentimentos, filtrar por status/data, visualizar tendências e exportar relatórios (ex.: quantos ativos/expirados/revogados).  
- **Cronjob de expiração:** automatizar `CheckExpiredConsentsUseCase` (APScheduler, Celery Beat ou job no servidor) para marcar expirados e enviar avisos de expiração próxima sem intervenção manual.  
- **Autenticação e autorização:** login para área admin (consultar/revogar, ver logs), com JWT ou sessão e proteção das rotas sensíveis.  
- **Frontend como SPA (opcional):** migrar para React/Vue/Svelte se houver necessidade de mais interatividade, filtros e gestão de estado; manter a mesma API.  
- **Resiliência das integrações:** fila (ex.: Redis + Celery ou task queue) para webhook N8N e Sheets com retry e dead-letter; ou pelo menos retry com backoff no aiohttp para o webhook.  
- **Testes E2E:** testes automatizados que simulem o fluxo completo (submit do formulário → registro → verificação de status/PDF) para evitar regressões em mudanças no schema ou no use case.

