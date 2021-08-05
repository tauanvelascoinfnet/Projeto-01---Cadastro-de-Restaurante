const express = require("express");
const v1Home = require('./v1/home');
const sobre = require("./v1/sobre");
const v1Sobre = require('./v1/sobre');
const v1Formulario = require('./v1/formulario');


module.exports = (app) => {
    const routev1 = express.Router();
    
    v1Home(routev1);
    v1Sobre(routev1);
    v1Formulario(routev1);

    app.use('', routev1); 
}
