import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/portfolio'
});

app.get('/api/projetos', async (req, res) => {
  try {
    const query = `
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
      GROUP BY p.id
      ORDER BY p.id;
    `;

    const { rows } = await pool.query(query);
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
