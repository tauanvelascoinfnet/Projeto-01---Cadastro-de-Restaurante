const express = require("express");
const v1Home = require('./v1/home'); // importando a configuração da rota home, assim como as demais abaixo
const sobre = require("./v1/sobre");
const v1Sobre = require('./v1/sobre');
const v1Formulario = require('./v1/formulario');

// o módulo de rotas é uma função que recebe a aplicação e vincula as rotas que quer construir
module.exports = (app) => { // esse app é o servidor passado no server.js, qdo chama "rotas(servidor)";
    const routev1 = express.Router();
    
    v1Home(routev1);
    v1Sobre(routev1);
    v1Formulario(routev1);

    app.use('/', routev1); 
}
