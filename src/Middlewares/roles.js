//Rol Admin
exports.verAdmin = function(req, res, next) {
    if(req.user.rol !== "Rol_Admin") return res.status(404).send({mensaje: "No cuenta con permisos de Administrador"})
    
    next();
}

//Rol Empresa
exports.verEmpresa = function(req, res, next) {
    if(req.user.rol !== "Rol_Empresa") return res.status(404).send({mensaje: "No cuenta con permisos de Empresa"})
    
    next();
}