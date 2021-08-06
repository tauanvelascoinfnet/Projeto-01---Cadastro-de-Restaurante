const express = require("express");
const servidor = express();
const path = require("path");
const bp = require("body-parser"); // permite fazer a transformação de valores que recebe no body, na url da request, etc.

const rotas = require("./routes/rotas");

servidor.use(bp.json());
servidor.use(bp.urlencoded());

rotas(servidor); // aqui que passa a instancia do servidor que usa na função do arquivo rotas

servidor.use(express.static(path.join(__dirname, "public"))); // apontar pasta publica para rodar os assets ("estoque")

servidor.set('views', path.join(__dirname, "views")) // informar o express onde está a pasta view
servidor.set("view engine", "ejs"); // escolher o template enginner para rodar o "html" do projeto

const porta = 5001;
servidor.listen(porta, () => {
  console.log("O SERVIDOR ESTA FUINCIONANDO NA PORTA ", porta);
});

// const express = require("express");
// const servidor = express();
// const path = require("path");
// const bp = require("body-parser");

// servidor.get("/", function(req, res) {
//     res.send("Pagina Inicial Teste Servidor")
// });

// servidor.get("/jaboticaba", function(req, res) {
//     res.send("Pagina da Jaboticaba")
// });

// servidor.listen(8081);

