const express = require('express');
const usuarioController = require('../Controller/usuario.controller');
const md_autentificacion = require('../Middlewares/autentificación');
const md_roles = require('../Middlewares/roles');

const api = express.Router();

api.post('/registrar', usuarioController.registrarEmpresa);
api.post('/login', usuarioController.login);
api.put('/editarEmpresa/:idEmpresa', [md_autentificacion.Auth, md_roles.verAdmin], usuarioController.editarEmpresa);
api.delete('/eliminarEmpresa/:idEmpresa', [md_autentificacion.Auth, md_roles.verAdmin], usuarioController.eliminarEmpresa);

module.exports = api; 