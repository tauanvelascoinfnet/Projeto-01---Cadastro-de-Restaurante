const formularioController = require("../../controllers/formulario.controller");
const middlewareValidateDTO = require("../../utils/mappers/dto-validate");

module.exports = (routeV1) => {
  routeV1
    .route("/formulario")
    .get(formularioController.getFormulario) 
    //.post(middlewareValidateDTO("body", formularioController.postFormularioSchema), formularioController.postFormulario); 
    .post(formularioController.postFormulario); 
};