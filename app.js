const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');
const { PORT } = process.env;

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();


// Cors
app.use(cors());

// Directorio publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );


// Rutas
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/events', require('./routes/events') );

// TODO: CRUD: Eventos 

app.listen( PORT, () => {
    console.log(`Servidor corriendo en puerto ${ PORT }`);
});




