# Backend

This directory contains a simple Express server that exposes REST endpoints for the portfolio database.

## Development

1. Copy `.env.example` to `.env` and adjust the database credentials.
2. Install dependencies with `npm install` (or `pnpm install`).
3. Run `npm run dev` to start the server with nodemon.

The API will be available on `http://localhost:3000` by default.

CORS is enabled automatically so the Angular frontend on `http://localhost:4200`
can consume the API without additional configuration.

### Endpoints

- `GET /api/projetos` – Returns the list of projects with their stacks and
  categories. Each project object has the following structure:

```json
{
  "id": 1,
  "titulo": "Meu projeto",
  "sumario": "Breve resumo",
  "descricao": "Descrição completa",
  "url_repositorio": "https://github.com/usuario/repositorio",
  "imagem_capa": "caminho/para/imagem.png",
  "data_inicio": "2024-01-01",
  "data_fim": "2024-02-01",
  "stacks": [
    { "id": 1, "nome": "Node.js", "tipo": "linguagem", "logo_url": "..." }
  ],
  "categorias": [
    { "id": 1, "nome": "Web", "descricao": "Projetos web" }
  ]
}
```
