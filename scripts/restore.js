const { Client } = require('pg');
const path = require('path');
const dotenv = require('dotenv');
const knexLib = require('knex');
const fs = require('fs');

// Load environment variables from backend/.env
const envPath = path.resolve(__dirname, '../backend/.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/portfolio';

async function ensureDatabase() {
  const url = new URL(connectionString);
  const dbName = url.pathname.replace(/^\//, '');
  url.pathname = '/postgres';

  const admin = new Client({ connectionString: url.toString() });
  await admin.connect();
  const exists = await admin.query('SELECT 1 FROM pg_database WHERE datname=$1', [dbName]);
  if (exists.rowCount === 0) {
    await admin.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Database ${dbName} created`);
  } else {
    console.log(`Database ${dbName} already exists`);
  }
  await admin.end();
}

async function runMigrations() {
  const config = require('../database/knexfile');
  const knex = knexLib(config);
  try {
    await knex.migrate.latest();
  } finally {
    await knex.destroy();
  }
}

(async () => {
  try {
    await ensureDatabase();
    await runMigrations();
    console.log('Database restored');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
