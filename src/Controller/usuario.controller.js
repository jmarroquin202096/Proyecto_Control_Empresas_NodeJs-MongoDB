const Usuarios = require('../Models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../Services/jwt');


function admin(req, res) {
    var modeloUsuario = new Usuarios();

    modeloUsuario.nombre = 'Admin';
    modeloUsuario.email = 'Admin';
    modeloUsuario.rol = 'Rol_Admin';

    Usuarios.find({ email: 'Admin' }, (err, usuarioEnocntrado) => {
        if (usuarioEnocntrado.length == 0) {
            bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
                modeloUsuario.password = passwordEncriptada;

                modeloUsuario.save((err, usuarioGuardado) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la Peticion' });
                    if (!usuarioGuardado) return res.status(500).send({ mensaje: 'Usuario ya Registrado' });

                    return res.status(200).send({ usuario: usuarioGuardado });
                });
            });
        } else {
            return res.status(500).send({ mensaje: 'Usuario ya Registrado' });
        }
    });
}

function registrarEmpresa(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuarios();

    if (parametros.nombre && parametros.email && parametros.password) {
        modeloUsuario.nombre = parametros.nombre;
        modeloUsuario.email = parametros.email;
        modeloUsuario.password = parametros.password;
        modeloUsuario.rol = 'Rol_Empresa';

        Usuarios.find({ email: parametros.email }, (err, usuarioEncontrado) => {
            if (usuarioEncontrado.length == 0) {
                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                    modeloUsuario.password = passwordEncriptada;

                    modeloUsuario.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error en la Peticion' });
                        if (!usuarioGuardado) return res.status(500).send({ mensaje: 'Error al Registrar Usuaurio' });

                        return res.status(200).send({ usuario: usuarioGuardado });
                    });
                });
           } 
        });

    } else {
        return res.status(500).send({ mensaje: 'Tiene que  ingresar los parametros obligatorios' });
    }
}

function editarEmpresa(req, res) {
    var parametros = req.body;
    var usuarioId = req.params.idUsuario;

    delete parametros.password;

    Usuarios.findByIdAndUpdate(req.user.sub,  parametros, {new: true}, (err, usuarioEditado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!usuarioEditado) return res.status(500).send({mensaje: 'Error al editar el Usuario'});

        return res.status(200).send({ usuario: usuarioEditado });
    })

}

function eliminarEmpresa(req, res) {
    var usuarioId = req.params.usuarioId;

    Empresas.findByIdAndDelete(usuarioId, (err, usuarioEliminada) => {
        if(err) return res.status(500).send({mensaje: 'Error en la Petición'});
        if(!usuarioEliminada) return res.status(500).send({mensaje: 'No se puede eliminar la Empresa'});

        return res.status(200).send({usuario: usuarioEliminada});
     });
}

function login(req, res) {
    var parametros = req.body;

    Usuarios.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Usuario no Encontrado' });
        if (usuarioEncontrado) {
            bcrypt.compare(parametros.password, usuarioEncontrado.password, (err, verificacionPassword) => {
                if (verificacionPassword) {
                    return res.status(200).send({ token: jwt.crearToken(usuarioEncontrado) });
                } else {
                    return res.status(500).send({ mensaje: 'Contraseña Invalida' });
                }
            })
        } else {
            return res.status(500).send({ mensaje: 'El Usuario no se encuentra Registrado' });
        }
    })
}


module.exports = {
    admin,
    registrarEmpresa, 
    login
}