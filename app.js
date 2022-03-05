const express = require('express');
const cors = require('cors');
const app = express();

/*Importaciones*/
const usuarioRoutes = require('./src/Routes/usuario.routes');
const empresaRoutes = require('./src/Routes/empresas.routes');


/*Middlewares*/
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/*Cabecera*/
app.use(cors());

/*Rutas*/
app.use('/api', usuarioRoutes, empresaRoutes);

module.exports = app;