const formularioController = require("../../controllers/formulario.controller");

module.exports = (routeV1) => {
  routeV1
    .route("/formulario")
    .get(formularioController.getFormulario) 
    .post(formularioController.postFormulario); 
};