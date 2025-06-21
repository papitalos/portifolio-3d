CREATE TABLE projetos (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255),
  sumario VARCHAR(255),
  descricao TEXT,
  url_repositorio VARCHAR(255),
  imagem_capa VARCHAR(255),
  data_inicio DATE,
  data_fim DATE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE stacks (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255),
  tipo VARCHAR(20) CHECK (tipo IN ('linguagem','framework','ferramenta')),
  logo_url VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255),
  descricao TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE projeto_stack (
  id SERIAL PRIMARY KEY,
  projeto_id INT REFERENCES projetos(id),
  stack_id INT REFERENCES stacks(id)
);

CREATE TABLE projeto_categoria (
  id SERIAL PRIMARY KEY,
  projeto_id INT REFERENCES projetos(id),
  categoria_id INT REFERENCES categorias(id)
);
