const mongoose = require('mongoose');
const app = require('./app');
const { admin } = require('./src/Controller/usuario.controller');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Control_Empresas', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Se Conecto Correctamente al Puerto 3000');

    app.listen(3000, function() {
        console.log('El Servidor de Express Corre Corectamente');
    });

}).catch(error => console.log(error));

admin();