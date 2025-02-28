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



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
//FIN :v
