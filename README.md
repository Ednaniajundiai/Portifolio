# Portfólio Ednan Ferreira 

Este é o código fonte do portfólio pessoal de Ednan Ferreira , desenvolvido com Next.js, Tailwind CSS e Framer Motion.

## Estrutura do Projeto

- **app/**: Contém as páginas e o layout principal (App Router).
- **components/**: Componentes reutilizáveis divididos em seções (Hero, Services, etc.) e layout (Header, Footer).
- **lib/**: Utilitários (configuração do Tailwind merge).

## Pré-requisitos

Certifique-se de ter o Node.js instalado.

## Instalação

1. Instale as dependências:

```bash
npm install
```

2. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Personalização

- **Cores**: As cores principais estão definidas em `tailwind.config.ts` (Emerald e Gold).
- **Conteúdo**: Edite os arquivos em `components/sections/` para alterar textos e imagens.
- **Imagens**: Adicione suas imagens na pasta `public/` e atualize as referências nos componentes.

## Deploy no GitHub Pages

Este projeto está configurado para ser implantado automaticamente no GitHub Pages usando GitHub Actions.

1.  Faça o push do código para o repositório no GitHub.
2.  Vá para as configurações do repositório no GitHub -> Pages.
3.  Em "Build and deployment", selecione "GitHub Actions" como fonte.
4.  O workflow configurado em `.github/workflows/deploy.yml` será executado automaticamente a cada push na branch `main`.

### Configuração de Domínio Personalizado

Se você planeja usar um domínio personalizado (ex: `www.seunome.com`):

1.  Crie um arquivo chamado `CNAME` na pasta `public/` do projeto.
2.  Dentro deste arquivo, coloque apenas o seu domínio (sem `http://` ou `https://`). Exemplo:
    ```
    www.seunome.com
    ```
3.  Faça o commit e push dessa alteração.
4.  Configure o DNS do seu domínio conforme as instruções do GitHub Pages.

### Observação sobre Base Path

Se você estiver implantando em um subdiretório (ex: `username.github.io/repo-name`) e **NÃO** estiver usando um domínio personalizado, pode ser necessário configurar o `basePath` no arquivo `next.config.js`.

```javascript
// next.config.js
const nextConfig = {
  // ...
  basePath: '/nome-do-repositorio',
};
```

Se você usar um domínio personalizado, o `basePath` geralmente não é necessário (ou deve ser removido).
