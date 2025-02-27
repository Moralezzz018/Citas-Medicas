 require('dotenv').config();
 const express = require('express');
 const { Pool } = require('pg');
 const app = express();
 const port = process.env.PORT || 3000;

 app.use(express.json()); //JSON Parsing

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

// DELETE cita por ID
app.delete('/citas/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM citas WHERE Id = $1', [id]);
    if (result.rowCount > 0) {
      res.json({ message: 'Cita eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Cita no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE doctor por ID
app.delete('/doctores/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM doctores WHERE Id = $1', [id]);
    if (result.rowCount > 0) {
      res.json({ message: 'Doctor eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Doctor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// DELETE especialidad por ID
app.delete('/especialidades/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM especialidades WHERE Id = $1', [id]);
    if (result.rowCount > 0) {
      res.json({ message: 'Especialidad eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Especialidad no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE paciente por ID
app.delete('/pacientes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM pacientes WHERE Id = $1', [id]);
    if (result.rowCount > 0) {
      res.json({ message: 'Paciente eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Paciente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});