const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empresaSchema = new Schema({
    nombre: String,
    email: String,
    empleados: [{
        nombre: String,
        puesto: String,
        departamento: String
    }]
});

module.exports = mongoose.model('Empresas', empresaSchema);