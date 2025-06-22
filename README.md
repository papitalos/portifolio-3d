# Portfolio Fullstack

This repository contains a personal portfolio project organized into three parts:

- **frontend** – Angular application showcasing the portfolio.
- **backend** – Express server providing an API connected to PostgreSQL.
- **database** – SQL scripts for creating the database schema.

## Running locally

1. Create the PostgreSQL database using the scripts in `database/`.
2. Configure the backend by copying `backend/.env.example` to `.env` and adjusting the credentials.
3. Install dependencies in both `frontend` and `backend` directories with your package manager (e.g. `npm install`).
4. Start the backend server from the `backend` directory: `npm start`.
5. Start the Angular frontend from the `frontend` directory: `ng serve`.

After both servers are running, open `http://localhost:4200` in your browser.

## API

The backend exposes two endpoints:

* `GET /api/categorias` – returns the list of project categories.
* `GET /api/projetos` – list of projects. You can filter by category ID using
  the optional `categoria` query parameter:

```bash
GET /api/projetos?categoria=<categoria_id>
```
