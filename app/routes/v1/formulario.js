const formularioController = require("../../controllers/formulario.controller");
const middlewareValidateDTO = require("../../utils/mappers/dto-validate");

module.exports = (routeV1) => {
  routeV1
    .route("/formulario")
    .get(formularioController.getFormulario) 
    // .post(middlewareValidateDTO("body", formularioController.postFormularioSchema), formularioController.postFormulario); 
    // na validação colocar o contexto que está validando (poderia ser header, por ex), o schema que foi criado pra validar
    .post(formularioController.postFormulario); 
};