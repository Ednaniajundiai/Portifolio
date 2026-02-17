# IMAGO Psicologia e Neuropsicologia - Documentação para Portfólio

## Resumo Executivo

**O que é o projeto**

Sistema web full stack que une site institucional e feed do Instagram para a clínica IMAGO Psicologia e Neuropsicologia. O cliente pode divulgar serviços, equipe e contato, além de exibir publicações do Instagram na própria página e conectar/reconectar a conta do Instagram por um painel admin, sem depender do desenvolvedor para atualizar conteúdo.

**Problema que resolve**

- **Conteúdo desatualizado:** Evita que o site fique desatualizado em relação ao Instagram: o feed é alimentado pela API (ou por fallbacks) em vez de copiar/colar manualmente.
- **Dependência técnica:** O painel em `/admin` permite que o cliente conecte a conta do Instagram (OAuth), verifique status e renove o token a cada 60 dias, reduzindo a dependência de suporte.
- **Presença digital unificada:** Um único lugar (site) para informações da clínica, serviços, profissionais e publicações, com CTA para WhatsApp e redes sociais.

**Público-alvo**

- **Primário:** Clínica IMAGO (gestores e equipe) que precisam manter o site e o feed atualizados com autonomia.
- **Secundário:** Pacientes e visitantes que buscam informações sobre serviços, localização e conteúdos da clínica (incluindo publicações do Instagram).

---

## Stack Tecnologica

| Camada      | Tecnologia        | Por que essa escolha? |
|------------|-------------------|------------------------|
| **Frontend** | React 18 + TypeScript | Componentizacao, ecossistema maduro e tipagem estatica para menos bugs e melhor manutencao. |
| **Build**    | Vite              | Build e HMR rápidos; suporte nativo a ESM e variáveis `import.meta.env` para configuração por ambiente. |
| **Estilização** | Tailwind CSS + shadcn/ui (Radix) | Estilos utilitários escaláveis e componentes acessíveis e customizáveis, sem dependência de biblioteca de UI pesada. |
| **Animações** | Framer Motion     | Animações declarativas (FadeIn, contador, botão WhatsApp) com boa performance e API simples. |
| **Estado/Server** | TanStack React Query | Preparado para cache e sincronização com API (usado no App; hook de posts atualmente usa estado local + env). |
| **Roteamento** | React Router v6   | Roteamento client-side padrão para SPA (Home, Sobre, Serviços, Profissionais, Publicações, Contato, Admin). |
| **Backend**   | Python 3.10 + FastAPI | API assíncrona, documentação automática (OpenAPI/Swagger), validação com Pydantic e baixa cerimônia para CRUD e integrações. |
| **ORM**      | SQLAlchemy 2      | Abstração do banco com modelos declarativos; fácil troca de engine (ex.: SQLite para PostgreSQL) e controle de transações. |
| **Banco**    | SQLite            | Zero config para single-instance; adequado para configurações (ex.: token Instagram) e volume baixo; arquivo único facilita backup. |
| **Auth (Instagram)** | OAuth 2.0 (Instagram Basic Display) | Fluxo padrão e seguro; token de longa duração (60 dias) armazenado no banco; cliente renova pelo `/admin`. |
| **HTTP cliente** | httpx (async)     | Cliente async para chamadas ao Instagram (OAuth e Graph API); API similar a requests, nativa para FastAPI. |
| **Cloud/Deploy** | Docker + Easypanel | Build multi-stage (Node para frontend, Python para backend); um container serve API + estático; Easypanel para deploy e env vars. |
| **Infra**    | Nginx (opcional)  | Configuração em `infra/` para reverso proxy e estáticos em cenários que não usam apenas o Uvicorn. |

---

## Arquitetura e Fluxo

**Padrão geral**

- **Frontend:** SPA (React) com rotas e componentes por página; dados estáticos em `src/data/siteData.ts`; consumo de API apenas no Admin (auth status e redirect de login).
- **Backend:** Organização em rotas, serviços e modelos (inspiração em camadas), sem camada de domínio rica; um único app FastAPI serve a API e, em produção, os arquivos estáticos do build (pasta `dist/`).
- **Banco:** Key-value em tabela `settings` (SQLAlchemy) para token e configs; criação de tabelas na subida do app (`Base.metadata.create_all`).

**Fluxo de dados**

1. **Usuário acessa o site**  
   Navegador carrega o SPA (em dev: Vite em `:5173`; em prod: arquivos em `dist/` servidos pelo FastAPI). Rotas como `/`, `/publicacoes`, `/contato` sao resolvidas no cliente.

2. **Publicações (feed)**  
   - **Hoje:** A página de Publicações (e a Home) usam o hook `useInstagramPosts`, que lê apenas variáveis de ambiente (`VITE_INSTAGRAM_POST_1` … `VITE_INSTAGRAM_POST_6`) e monta objetos com `embed_url` para iframes. Não há chamada ao backend para posts.
   - **Backend disponível:** `GET /api/posts` no FastAPI obtém posts via token salvo no banco (Instagram Graph API) ou, na ausência/erro de token, usa fallback de perfil público (scraping da API interna do Instagram Web). O frontend não consome esse endpoint na versão atual.

3. **Admin – conexão Instagram**  
   - Usuário acessa `/admin`.  
   - Frontend chama `GET /api/auth/status` (fetch) para exibir “Conectado” ou “Nao conectado”.  
   - “Conectar Instagram” redireciona para `GET /api/auth/login`, que responde com `RedirectResponse` para a URL de autorização do Instagram (OAuth).  
   - Apos autorizar, o Instagram redireciona para `GET /api/auth/callback?code=...`. O backend troca o `code` por access token (curto), depois por long-lived token e persiste na tabela `settings`; em seguida redireciona para `/admin?auth=success`.

4. **Produção (Docker)**  
   - Build: estágio 1 compila o frontend (Node/Vite) e gera `dist/`; estágio 2 copia `dist/` para a imagem Python e sobe o Uvicorn na porta 80.  
   - Requisições a `/api/*` são tratadas pelo FastAPI; demais rotas recebem `index.html` (fallback SPA) ou arquivos estáticos de `dist/`.

**Diagrama de fluxo (resumido)**

```
[Cliente] --> /admin --> GET /api/auth/status
[Cliente] --> "Conectar" --> GET /api/auth/login --> [Instagram OAuth] --> GET /api/auth/callback?code=...
[Backend] --> exchange_code_for_token --> get_long_lived_token --> save_setting_value(db, "instagram_token", ...)
[Backend] --> GET /api/posts --> get_posts(db) --> token? Graph API : get_public_posts() fallback
[Publicações/Home] --> useInstagramPosts() --> VITE_INSTAGRAM_POST_* (env) --> iframes ou lista vazia
```

---

## Destaques Técnicos (Deep Dive)

### 1. Integração com Instagram: OAuth + Graph API e fallback para perfil público

**O que foi feito**

- **OAuth 2.0:** Fluxo completo no backend: `/api/auth/login` gera URL de autorização (scopes `user_profile`, `user_media`); `/api/auth/callback` recebe o `code`, troca por short-lived token via `POST https://api.instagram.com/oauth/access_token` e em seguida por long-lived token (60 dias) via `GET https://graph.instagram.com/access_token` com `grant_type=ig_exchange_token`. O token final é salvo na tabela `settings` (chave `instagram_token`).
- **Uso do token:** `get_posts(db)` no `instagram_service` lê o token do banco (ou, em fallback, de `VITE_INSTAGRAM_TOKEN`), chama `GET https://graph.instagram.com/me/media` com `fields=id,caption,media_type,media_url,permalink,timestamp` e `limit=9`.
- **Resiliência:** Em resposta 400 (token inválido/expirado) ou em exceção de rede, o serviço chama `get_public_posts(username, limit)`, que usa a API interna do Instagram Web (`/api/v1/users/web_profile_info/?username=...`) com headers de browser e extrai `edges` de `edge_owner_to_timeline_media`, normalizando para o mesmo formato (id, caption, media_type, media_url, permalink, timestamp). Assim, o endpoint `/api/posts` sempre devolve uma lista (OAuth ou fallback), evitando tela quebrada.

**Trecho relevante (fallback):** `instagram_service.py` – em `get_posts`, após `response.status_code == 400` ou `except`, chama `return await get_public_posts()`.

### 2. Painel Admin: fluxo completo no frontend sem lib de auth

**O que foi feito**

- A página `/admin` não usa SDK do Facebook/Instagram no frontend. Toda a autenticacao e feita no backend; o frontend apenas:
  - Chama `GET /api/auth/status` para saber se ha token e exibir “Conectado” com data da última atualização.
  - Redireciona o usuario para `GET /api/auth/login`, que devolve um redirect HTTP para o Instagram.
  - Apos o callback, o backend redireciona para `/admin?auth=success`; o frontend le `useSearchParams().get("auth")` e exibe um alerta de sucesso.
- Não há armazenamento de token no frontend; segredos ficam apenas no backend e no banco. Isso reduz superficie de ataque e simplifica o fluxo (um redirect apenas).

### 3. Exibição de posts: iframe embed vs imagem + link

**O que foi feito**

- O hook `useInstagramPosts` monta posts a partir de URLs fixas no `.env` (`VITE_INSTAGRAM_POST_1` … `VITE_INSTAGRAM_POST_6`). Para cada URL que contém `/p/`, é gerado um objeto com `permalink`, `media_type: 'EMBED'` e `embed_url` (URL + `/embed`).
- Na página Publicações (e trecho na Home), se `media_type === 'EMBED'` e `embed_url` existir, o post é exibido em um `<iframe src={post.embed_url}>`; senão, usa-se card com `media_url` (imagem), caption e link “Ler no Instagram”. Isso permite “Modo Aprovação" do app (quando a API ainda não está liberada) usando apenas embeds manuais, mantendo a mesma interface.

---

## Desafios e Soluções

| Desafio / trade-off | Solução adotada |
|---------------------|-----------------|
| **Token do Instagram expira em 60 dias** | Token armazenado no banco; painel `/admin` explica que é preciso reconectar; botão “Reconectar Instagram” repete o fluxo OAuth. Não há refresh automático (a API não oferece refresh token para Basic Display). |
| **App em modo revisão / sem token** | Backend: fallback para `get_public_posts()` (perfil público). Frontend: hook usa URLs manuais no `.env` para embeds, permitindo exibir posts mesmo sem OAuth aprovado. |
| **Duas fontes de verdade para posts** | Backend expoe `GET /api/posts` (OAuth ou fallback). Frontend usa apenas env. Resultado: backend e frontend podem mostrar fontes diferentes; para V2 sugere-se unificar (frontend chamar `/api/posts` e usar env apenas como fallback). |
| **CORS e mesmo domínio em produção** | Em produção, SPA e API estão no mesmo host (FastAPI serve `dist/` e `/api`); em dev, proxy do Vite encaminha `/api` para o backend. CORS configurado via `ALLOWED_ORIGINS` para evitar acesso indevido. |
| **SPA e 404** | Handler 404 no FastAPI: se a rota não for `/api/*` e existir `dist/index.html`, retorna esse arquivo para o cliente resolver a rota (React Router). |
| **Build e deploy unificados** | Docker multi-stage: uma imagem final com apenas Python + `dist/`; um processo (Uvicorn) serve tudo, simplificando deploy no Easypanel. |

---

## Sugestões de Melhoria (Versão 2.0)

1. **Unificar fonte de posts no frontend**  
   Fazer o hook `useInstagramPosts` chamar primeiro `GET /api/posts`; se a API falhar ou retornar vazio, usar `VITE_INSTAGRAM_POST_*` como fallback. Assim, quando o cliente conectar o Instagram no `/admin`, as publicações passam a vir da API automaticamente na mesma UI.

2. **Cache de posts no backend**  
   Gravar os posts retornados pela API (ou pelo fallback) em tabela ou cache (ex.: Redis/SQLite com TTL) e expor esse cache no `GET /api/posts`, atualizando em background a cada X minutos. Reduz chamadas ao Instagram e tempo de resposta.

3. **Migrações de banco**  
   Trocar `Base.metadata.create_all` por Alembic (ou similar) para versão de schema e mudanças futuras (novas colunas, índices) sem perda de dados.

4. **PostgreSQL em produção**  
   Para múltiplas instâncias ou maior confiabilidade, trocar SQLite por PostgreSQL; alterar apenas `SQLALCHEMY_DATABASE_URL` e garantir que a tabela `settings` seja criada/migrada.

5. **Renovação proativa do token**  
   Job agendado (cron ou Celery) que, N dias antes do vencimento, avisa o cliente (e-mail/dashboard) ou tenta renovar se a API permitir, reduzindo risco de feed parar no dia 61.

6. **Proteção da rota `/admin`**  
   Adicionar autenticação (ex.: login com senha ou OAuth do próprio site) para que apenas o cliente acesse a configuração do Instagram.

7. **Testes**  
   Testes unitários no backend (FastAPI + pytest) para `exchange_code_for_token`, `get_long_lived_token`, `get_posts` (mock de httpx e DB); testes de integração para `GET /api/auth/status` e `GET /api/posts`.

8. **Acessibilidade e SEO**  
   Revisar labels e roles nos botões (ex.: Admin e WhatsApp); garantir meta tags e estrutura semântica nas páginas principais para SEO.

---

## Como usar este documento no portifolio

- Copie as seções que quiser para a página do projeto no seu portifolio.
- Inclua link do repositório e, se houver, link do site em produção.
- Opcional: adicione screenshots da Home, Publicações e Admin para ilustrar o fluxo.
- Se quiser encurtar, priorize: **Resumo Executivo**, **Stack** (tabela), **Arquitetura e Fluxo** (um paragrafo + diagrama) e **Destaques Tecnicos** (os 3 itens), deixando Desafios e Sugestoes como “detalhes disponiveis no README ou em portifolio.md”.
