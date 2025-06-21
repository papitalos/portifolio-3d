-- Habilita UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum para tipo de stack
DROP TYPE IF EXISTS stack_tipo;
CREATE TYPE stack_tipo AS ENUM ('linguagem', 'framework', 'ferramenta');

-- Tabelas principais
DROP TABLE IF EXISTS projeto_categoria CASCADE;
DROP TABLE IF EXISTS projeto_stack CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS stacks CASCADE;
DROP TABLE IF EXISTS projetos CASCADE;

CREATE TABLE projetos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo VARCHAR,
  sumario VARCHAR,
  descricao TEXT,
  url_repositorio VARCHAR,
  imagem_capa VARCHAR,
  data_inicio DATE,
  data_fim DATE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE stacks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR,
  tipo stack_tipo,
  logo_url VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE categorias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR,
  descricao TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE projeto_stack (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  projeto_id UUID,
  stack_id UUID,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id),
  FOREIGN KEY (stack_id) REFERENCES stacks(id)
);

CREATE TABLE projeto_categoria (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  projeto_id UUID,
  categoria_id UUID,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id),
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);
