 require('dotenv').config();
 const express = require('express');
 const { Pool } = require('pg');
 const app = express();
 const port = process.env.PORT || 3000;
 app.use(express.json());
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
    res.json({ message: 'Servidor funcionandopruebacitasmedicas', time: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
 });
 app.listen(port, () => {
  console.log(`Servidor corriendo en pruebacitasmedicsdfsdfas:${port}`);
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

// POST PARTE LUCA //
//                  //
// 
//

app.post('/insertarEspecialidad', async (req, res) => {
  const {nombre} = req.body; // Recibe datos desde el formulario

  try {
    const result = await pool.query(
      `INSERT INTO "especialidades" ("nombre") VALUES ($1) RETURNING *`,
      [nombre]
  );

      res.status(201).json({ message: 'Especialidad Guardada', articulo: result.rows[0] }); // esta parte de ultimo hace un refresh de los datos que se enviaron
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.post('/insertarPaciente', async (req, res) => {
  const {nombre,edad,telefono,correo} = req.body; // Recibe datos desde el formulario

  try {
    const result = await pool.query(
      `INSERT INTO "pacientes" ("nombre","edad","telefono","correo") VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre, edad, telefono, correo]
  );

      res.status(201).json({ message: 'Paciente Guardada', articulo: result.rows[0] }); // esta parte de ultimo hace un refresh de los datos que se enviaron
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.post('/insertarDoctor', async (req, res) => {
  const {nombre,id_especialidad,telefono} = req.body; // Recibe datos desde el formulario

  try {
    const result = await pool.query(
      `INSERT INTO "doctores" ("nombre","id_especialidad","telefono") VALUES ($1, $2, $3) RETURNING *`,
      [nombre, id_especialidad, telefono]
  );

      res.status(201).json({ message: 'Doctor Guardada', articulo: result.rows[0] }); // esta parte de ultimo hace un refresh de los datos que se enviaron
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


app.post('/insertarCita', async (req, res) => {
  const {id_paciente,id_doctor,fecha,hora,estado} = req.body; // Recibe datos desde el formulario

  try {
    const result = await pool.query(
      `INSERT INTO "citas" ("id_paciente","id_doctor","fecha","hora","estado") VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id_paciente,id_doctor,fecha,hora,estado]
  );

      res.status(201).json({ message: 'Cita Guardada', articulo: result.rows[0] }); // esta parte de ultimo hace un refresh de los datos que se enviaron
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


// FIN PARTE LUCA //
// 
// 
// 
// //
