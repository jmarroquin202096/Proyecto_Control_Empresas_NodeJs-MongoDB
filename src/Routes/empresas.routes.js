const express = require('express');
const empresasController = require('../Controller/empresas.controller');

const md_autentificacion = require('../Middlewares/autentificación');
const md_roles = require('../Middlewares/roles');

const api = express.Router();

api.post('/agregarEmpresa', [md_autentificacion.Auth, md_roles.verAdmin], empresasController.agregarEmpresas);
api.put('/editarEmpresa/:idEmpresa', [md_autentificacion.Auth, md_roles.verAdmin], empresasController.editarEmpresas);
api.delete('/eliminarEmpresa/:idEmpresa', [md_autentificacion.Auth, md_roles.verAdmin], empresasController.eliminarEmpresas);
api.post('/agregarEmpleadosaEmpresa/:idEmpresa', [md_autentificacion.Auth, md_roles.verEmpresa], empresasController.agregarEmpleados);
api.put('/editarEmpleadosaEmpresa/:idEmpleado', [md_autentificacion.Auth, md_roles.verEmpresa], empresasController.editarEmpleados);
api.delete('/eliminarEmpleadosaEmpresa/:idEmpleado', [md_autentificacion.Auth, md_roles.verEmpresa], empresasController.eliminarEmpleados);
api.get('/buscarEmpleadoporId/:idEmpleado', [md_autentificacion.Auth, md_roles.verEmpresa], empresasController.buscarEmpleadoporId);
api.get('/buscarEmpleadoporNombre/:idEmpresa', [md_autentificacion.Auth, md_roles.verEmpresa], empresasController.buscarEmpleadoporNombre);
api.get('/buscarEmpleadoporPuesto/:idEmpresa', [md_autentificacion.Auth, md_roles.verEmpresa], empresasController.buscarEmpleadoporPuesto);
api.get('/buscarEmpleadoporDepartamento/:idEmpresa', [md_autentificacion.Auth, md_roles.verEmpresa], empresasController.buscarEmpleadoporDepartamento);
api.get('/buscarEmpleado/:idEmpresa', [md_autentificacion.Auth, md_roles.verEmpresa], empresasController.buscarEmpleado);

module.exports =  api;