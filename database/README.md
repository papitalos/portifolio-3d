# Database

This folder contains Knex migrations for creating the PostgreSQL schema.

## Usage

1. Copy `backend/.env.example` to `backend/.env` and adjust the connection string.
2. Run the restore script from the repository root:

```bash
npm run restore
```

The script will create the database if it does not exist and apply all migrations.
