const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../backend/.env') });

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/portfolio',
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
    loadExtensions: ['.js']
  }
};
