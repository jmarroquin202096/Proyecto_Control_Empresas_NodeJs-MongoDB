const Empresas = require('../Models/empresas.model');
const mongoose = require('mongoose');

function agregarEmpresas(req, res) {
    var parametros = req.body;
    var modeloEmpresas = new Empresas();

    if(parametros.nombre && parametros.email) {
        modeloEmpresas.nombre = parametros.nombre;
        modeloEmpresas.email = parametros.email;

        modeloEmpresas.save((err, empresaGuardada) => {
            if(err) return res.status(400).send({ mensaje: 'Erorr en la peticion.' });
            if(!empresaGuardada) return res.status(400).send({ mensaje: 'Error al agregar el Empresa'});

            return res.status(200).send({ empresa: empresaGuardada });
        });
    } else {
        return res.status(500).send({mensaje: 'Ingrese todos los Datos.'});
    }
 }

 function editarEmpresas(req, res) {
     var parametros = req.body;
     var idEmp =  req.params.idEmpresa;

    Empresas.findByIdAndUpdate(idEmp, parametros, { new : true }, (err, empresaActualizada) => {
        if(err) return res.status(500).send({mensaje: 'Error en la Petición'});
        if(!empresaActualizada) return res.status(500).send({mensaje: 'Error al Editar la Empresa'});

        return res.status(200).send({empresa: empresaActualizada});
    });
 }

 function eliminarEmpresas(req, res) {
     var idEmp = req.params.idEmpresa;

     Empresas.findByIdAndDelete(idEmp, (err, empresaEliminada) => {
        if(err) return res.status(500).send({mensaje: 'Error en la Petición'});
        if(!empresaEliminada) return res.status(500).send({mensaje: 'No se puede eliminar la Empresa'});

        return res.status(200).send({empresa: empresaEliminada});
     });
 }

 function agregarEmpleados(req, res) {
     var idEmp = req.params.idEmpresa;
     var parametros = req.body;

     if(parametros.nombre && parametros.puesto && parametros.departamento) {
         
        Empresas.findByIdAndUpdate(idEmp, { $push : { empleados : {nombre: parametros.nombre, puesto: parametros.puesto, departamento: parametros.departamento}}}, 
        { new : true},  (err, agregarEmpleado) => {
            if(err) return res.status(500).send({mensaje: 'Error en la Petición'});
            if(!agregarEmpleado) return res.status(500).send({mensaje: 'No puede Agregar al Empleado'});

            return res.status(200).send({empresa: agregarEmpleado});
        });
     } else {
         return res.status(500).send({mensaje: 'Debe Ingresar todos los Datos'});
     }
 }

 function editarEmpleados(req, res) {
     var idEmp = req.params.idEmpleado;
     var parametros = req.body;
     

     Empresas.findOneAndUpdate({ empleados: { $elemMatch: { "_id": idEmp } } }, 
         {"empleados.$.nombre": parametros.nombre, "empleados.$.puesto": parametros.puesto, "empleados.$.departamento": parametros.departamento}, {new: true},(err, empleadoEditado) => {
         if (err) return res.status(500).send({ mensaje: 'Error en la Petición' });
         if (!empleadoEditado) return res.status(500).send({ mensaje: 'No se puede Editar el Empleado' });

         return res.status(200).send({empleado: empleadoEditado});
     });
}
 
function eliminarEmpleados(req, res) {
    var idEmp = req.params.idEmpleado;

    
    Empresas.findOneAndUpdate({ empleados: { $elemMatch: { "_id": idEmp } } }, { $pull: { empleados: { _id: idEmp } } }, { new: true }, (err, empleadoEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la Petición' });
        if (!empleadoEliminado) return res.status(500).send({ mensaje: 'Error al Eliminar Empleado' });

        return res.status(200).send({empleado: empleadoEliminado});
    })
}

function buscarEmpleadoporId(req, res) {
    var idEmp = req.params.idEmpleado;

    Empresas.findOne({ empleados: { $elemMatch: { "_id" : idEmp } } }, {"empleados.$": 1} ,(err, empleadoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la Petición' });
        if (!empleadoEncontrado) return res.status(500).send({ mensaje: 'Error al Encontrar Empleado' });

        return res.status(200).send({ empresa: empleadoEncontrado });
    });
}

function buscarEmpleadoporNombre(req, res) {
    var idEmp = req.params.idEmpresa;
    var parametros = req.body;

    Empresas.aggregate([
        { $match: { "_id": mongoose.Types.ObjectId(idEmp) } },
        { $unwind: "$empleados" },
        { $match: { "empleados.nombre": { $regex: parametros.nombre, $options: 'i' } } },
        { $group: { "_id": "$_id", "nombre":  {"$first": "$nombre"}, "empleados": { "$push": "$empleados" } } }
    ]).exec((err, empeladoEnocntrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la Petición' });
            if (!empeladoEnocntrado) return res.status(500).send({ mensaje: 'Error al Enocntrar Empeleado por su Nombre' });

            return res.status(200).send({ empleados: empeladoEnocntrado });
        });
}

function buscarEmpleadoporPuesto(req, res) {
    var idEmp = req.params.idEmpresa;
    var parametros = req.body;

    Empresas.aggregate([
        { $match: { "_id": mongoose.Types.ObjectId(idEmp) } },
        { $unwind: "$empleados" },
        { $match: { "empleados.puesto": { $regex: parametros.puesto, $options: 'i' } } },
        { $group: { "_id": "$_id", "nombre": { "$first": "$nombre" }, "empleados": { "$push": "$empleados" } } }
    ]).exec((err, empeladoEnocntrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la Petición' });
        if (!empeladoEnocntrado) return res.status(500).send({ mensaje: 'Error al Enocntrar Empeleado por su Puesto' });

        return res.status(200).send({ empleados: empeladoEnocntrado });
    });
}

function buscarEmpleadoporDepartamento(req, res) {
    var idEmp = req.params.idEmpresa;
    var parametros = req.body;

    Empresas.aggregate([
        { $match: { "_id": mongoose.Types.ObjectId(idEmp) } },
        { $unwind: "$empleados" },
        { $match: { "empleados.departamento": { $regex: parametros.departamento, $options: 'i' } } },
        { $group: { "_id": "$_id", "nombre": { "$first": "$nombre" }, "empleados": { "$push": "$empleados" } } }
    ]).exec((err, empeladoEnocntrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la Petición' });
        if (!empeladoEnocntrado) return res.status(500).send({ mensaje: 'Error al Enocntrar Empeleado por su Departamento' });

        return res.status(200).send({ empleados: empeladoEnocntrado });
    });
}

function buscarEmpleado(req, res) {

    Empresas.findOne({ }, (err, empleadoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la Petición' });
        if (!empleadoEncontrado) return res.status(500).send({ mensaje: 'Error al Encontrar Empleado' });

        return res.status(200).send({ empresa: empleadoEncontrado });
    }).populate('idEmpleado', 'nombre puesto departamento ');
}

 module.exports = {
     agregarEmpresas,
     editarEmpresas,
     eliminarEmpresas,
     agregarEmpleados,
     editarEmpleados,
     eliminarEmpleados,
     buscarEmpleadoporId,
     buscarEmpleadoporNombre,
     buscarEmpleadoporPuesto,
     buscarEmpleadoporDepartamento,
     buscarEmpleado
 }