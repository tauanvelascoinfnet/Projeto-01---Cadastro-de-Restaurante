const homeController = require("../../controllers/home.controller");

module.exports = (routeV1) => {

    routeV1.route('/')
        .get(
            (req, res, next) => {
                console.log("meu middleware");
                next()
            },
            homeController.getHome
        );
        
}