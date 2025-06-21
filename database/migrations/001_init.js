const fs = require('fs');
const path = require('path');

exports.up = function(knex) {
  const sql = fs.readFileSync(path.join(__dirname, '001_init.sql')).toString();
  return knex.raw(sql);
};

exports.down = function(knex) {
  const downSQL = `
DROP TABLE IF EXISTS projeto_categoria CASCADE;
DROP TABLE IF EXISTS projeto_stack CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS stacks CASCADE;
DROP TABLE IF EXISTS projetos CASCADE;
DROP TYPE IF EXISTS stack_tipo;
`;
  return knex.raw(downSQL);
};
