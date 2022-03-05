const jwt_simple = require('jwt-simple');
const moment = require('moment');
const secretKey = "secret_key";

exports.Auth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(404).send({ mensaje: 'Error en la Peticion de Authorization' });
    } 

    var token = req.headers.authorization.replace(/[' "]/g, ' ');

    try {
        var payload = jwt_simple.decode(token, secretKey);
        if (payload.exp <= moment.unix()) {
            return res.status(500).send({ mensaje: 'Error en el Token' });
        }
    } catch (err) {
        return res.status(500).send({ mensaje: 'El Token es Invalido' });
    }

    req.user = payload;
    next();
}