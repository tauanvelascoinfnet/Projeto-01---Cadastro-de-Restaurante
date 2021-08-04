const express = require("express");
const servidor = express();
const path = require("path");
const bp = require("body-parser");

servidor.get("/", function(req, res) {
    res.send("Pagina Inicial Teste Servidor")
});

servidor.get("/jaboticaba", function(req, res) {
    res.send("Pagina da Jaboticaba")
});

servidor.listen(8081);