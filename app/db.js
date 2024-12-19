
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { Client } = require('pg');
const nodemailer = require('nodemailer');

const app = express();
const port = 5000;

// Configura CORS para permitir peticiones desde tu aplicación React Native
app.use(cors());
app.use(express.json());

// Configura el pool de conexiones a PostgreSQL
const pool = new Pool({
  user: 'postgres',     // Usuario de PostgreSQL
  host: 'localhost',    // Servidor de PostgreSQL
  database: 'postgresql', // Nombre de la base de datos
  password: 'seba1234', // Contraseña de PostgreSQL
  port: 5432,           // Puerto de PostgreSQL
});

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // o el servicio que desees
  auth: {
    user: '', // Correo del usuario que va a enviar los correos
    pass: '', // Contraseña
  },
});

app.post('/enviar-correo', async (req, res) => {
  console.log('Recibiendo solicitud de correo...');
  try {
    const mailOptions = {
      from: 'horacioquiroga752@gmail.com', // Email del emisor
      to: 'manredfan10@gmail.com', // Email del receptor
      subject: 'Probando el servicio de correos', // Titular del correo
      text: 'Poto', // Contenido del correo
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        // Responde con JSON en caso de error
        return res.status(500).json({ error: 'Error al enviar el correo' });
      }
      console.log('Correo enviado correctamente', info);
      // Responde con JSON en caso de éxito
      return res.status(200).json({ message: 'Correo enviado correctamente' });
    });
  } catch (error) {
    console.error('Error en el servidor:', error);
    // Responde con JSON en caso de error
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/jugadores', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre, edad, ranking, puntos, flag, nacionalidad, trofeos, imagen1 FROM jugadores ORDER BY ranking ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

app.get('/jugadores/:id', async (req, res) => {
  const jugadorId = req.params.id; // ID del jugador desde la URL

  try {
    const result = await pool.query('SELECT * FROM jugadores WHERE id = $1', [jugadorId]);
    
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Devolver los datos del jugador
    } else {
      res.status(404).json({ error: 'Jugador no encontrado' });
    }
  } catch (err) {
    console.error('Error en la consulta:', err);
    res.status(500).json({ error: 'Error al obtener los datos del jugador' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});