import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/portfolio'
});

const connectionString = pool.options.connectionString;
console.log(`Conectando ao banco de dados com a string: ${connectionString}`);

app.get('/api/projetos', async (req, res) => {
  try {
    const { categoria } = req.query;
    let query = `
      SELECT
        p.id,
        p.titulo,
        p.sumario,
        p.descricao,
        p.url_repositorio,
        p.imagem_capa,
        p.data_inicio,
        p.data_fim,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object(
            'id', s.id,
            'nome', s.nome,
            'tipo', s.tipo,
            'logo_url', s.logo_url
          )) FILTER (WHERE s.id IS NOT NULL),
          '[]'
        ) AS stacks,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object(
            'id', c.id,
            'nome', c.nome,
            'descricao', c.descricao
          )) FILTER (WHERE c.id IS NOT NULL),
          '[]'
        ) AS categorias
      FROM projetos p
      LEFT JOIN projeto_stack ps ON ps.projeto_id = p.id
      LEFT JOIN stacks s ON ps.stack_id = s.id
      LEFT JOIN projeto_categoria pc ON pc.projeto_id = p.id
      LEFT JOIN categorias c ON pc.categoria_id = c.id
    `;

    const params = [];
    if (categoria) {
      params.push(categoria);
      query += `
      WHERE EXISTS (
        SELECT 1 FROM projeto_categoria pc2
        WHERE pc2.projeto_id = p.id AND pc2.categoria_id = $1
      )`;
    }

    query += `
      GROUP BY p.id
      ORDER BY p.id;`;

    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/categorias', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, nome, descricao FROM categorias ORDER BY nome'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
