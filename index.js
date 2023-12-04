

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./controllers/database/config');



// Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));


// Directorio público
app.use(express.static('public'));


// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
} );