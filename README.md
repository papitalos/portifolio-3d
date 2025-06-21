# Portfolio Fullstack

This repository contains a personal portfolio project organized into three parts:

- **frontend** – Angular application showcasing the portfolio.
- **backend** – Express server providing an API connected to PostgreSQL.
- **database** – SQL scripts for creating the database schema.

The root `package.json` defines a [pnpm](https://pnpm.io) workspace so that dependencies for both the frontend and backend can be installed from the project root.

## Running locally

1. Create the PostgreSQL database using the scripts in `database/`.
2. Configure the backend by copying `backend/.env.example` to `.env` and adjusting the credentials.
3. Install project dependencies using [pnpm](https://pnpm.io):

   ```bash
   pnpm run install:all
   ```

4. From the project root, run the frontend and backend together:

   ```bash
   pnpm start
   ```

   This command launches a small Node script that starts the Express backend on port 3000 and the Angular development server on port 4200.

After both servers are running, open `http://localhost:4200` in your browser.
