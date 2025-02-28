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

//PUT

app.put('/pacientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, edad, telefono, correo } = req.body;

    try {
        const result = await pool.query(
            `UPDATE pacientes SET nombre = $1, edad = $2, telefono = $3, correo = $4 WHERE id = $5 RETURNING *`,
            [nombre, edad, telefono, correo, id]
        );
        res.json({ message: 'Paciente actualizado', paciente: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.put('/doctores/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, id_especialidad, telefono } = req.body;

    try {
        const result = await pool.query(
            `UPDATE doctores SET nombre = $1, id_especialidad = $2, telefono = $3 WHERE id = $4 RETURNING *`,
            [nombre, id_especialidad, telefono, id]
        );
        res.json({ message: 'Doctor actualizado', doctor: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/especialidades/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const result = await pool.query(
            `UPDATE especialidades SET nombre = $1 WHERE id = $2 RETURNING *`,
            [nombre, id]
        );
        res.json({ message: 'Especialidad actualizada', especialidad: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.put('/citas/:id', async (req, res) => {
    const { id } = req.params;
    const { id_paciente, id_doctor, fecha, hora, estado } = req.body;

    try {
        const result = await pool.query(
            `UPDATE citas SET id_paciente = $1, id_doctor = $2, fecha = $3, hora = $4, estado = $5 WHERE id = $6 RETURNING *`,
            [id_paciente, id_doctor, fecha, hora, estado, id]
        );
        res.json({ message: 'Cita actualizada', cita: result.rows[0] });
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
      `INSERT INTO "especialidades" ("nombre") VALUES ($1) ON CONFLICT DO NOTHING RETURNING *`,
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
      `INSERT INTO "pacientes" ("nombre","edad","telefono","correo") VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING *`,
      [nombre, edad, telefono, correo]
  );

    if (result.rows.length > 0) {
      res.status(201).json({ message: 'Paciente Guardada', articulo: result.rows[0] }); // esta parte de ultimo hace un refresh de los datos que se enviaron
    } else {
      res.status(409).json({ message: 'Paciente ya existe' });
    }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.post('/insertarDoctor', async (req, res) => {
  const {nombre,id_especialidad,telefono} = req.body; // Recibe datos desde el formulario

  try {
    const result = await pool.query(
      `INSERT INTO "doctores" ("nombre","id_especialidad","telefono") VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING *`,
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



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

