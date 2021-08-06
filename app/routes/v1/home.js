const homeController = require("../../controllers/home.controller");

module.exports = (routeV1) => { // pega um objeto de rota, estabelecido no arquivo de rotas

    routeV1.route('/') //route é a função do objeto de rota que vincula o valor, no caso a /, endereço raiz, no caso
        .get(
            (req, res, next) => {
                console.log("meu middleware");
                next()
            },
            homeController.getHome // substituiu o bloco de código que exibia na página pela referência do método que criou pra home. 
        );
        
}