 require('dotenv').config();
 const express = require('express');
 const { Pool } = require('pg');
 const app = express();
 const port = process.env.PORT || 3000;
 const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
 });
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Servidor funcionando', time: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
 });
 app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
 });

 app.get('/citas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM citas');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/doctores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM doctores');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/especialidades', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM especialidades');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/pacientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pacientes');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

