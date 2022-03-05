const e = require('express');
const jwt_simple = require('jwt-simple');
const moment = require('moment');
const secretKey = "secret_key";

exports.crearToken = function(usuario) {
    let payload = {
        sub: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        iat: moment().unix(),
        exp: moment().day(8, 'days').unix()
    }
    return jwt_simple.encode(payload, secretKey);
}