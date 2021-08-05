
const controllerSobre = require("../../controllers/sobre.controller");

module.exports = (routeV1) => {
    routeV1.route('/sobre')
        .get(controllerSobre.getSobre);
}