const express = require('express');
const usuarioController = require('../Controller/usuario.controller');
const md_autentificacion = require('../Middlewares/autentificación');

const api = express.Router();

api.get('/', usuarioController.admin);
api.post('/registrar', usuarioController.registrarEmpresa);
api.post('/login', usuarioController.login);

module.exports = api;