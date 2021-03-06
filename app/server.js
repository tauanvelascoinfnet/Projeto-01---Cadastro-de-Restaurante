const express = require("express");
const servidor = express();
const path = require("path");
const bp = require("body-parser"); // permite fazer a transformação em json de valores que recebe no body, na url da request, etc.

const rotas = require("./routes/rotas");

servidor.use(bp.json()); // servidor estará preparado para receber dados tipo json na requisição, no cabeçalho ou no body
servidor.use(bp.urlencoded()); // para quando quem vai fazer a request vai entregar os  dados em outro formato, usado para forms html

rotas(servidor); // aqui que passa a instancia do servidor que usa na função do arquivo rotas

//instalação e configuração do ejs com as views
servidor.use(express.static(path.join(__dirname, "public"))); // apontar pasta publica para rodar os assets ("estoque")
servidor.set('views', path.join(__dirname, "views")) // informar o express onde está a pasta view
servidor.set("view engine", "ejs"); // escolher o template enginner para rodar o "html" do projeto

// const porta = 5001;
// servidor.listen(porta, () => {
//   console.log("O SERVIDOR ESTA FUINCIONANDO NA PORTA ", porta);
// });
servidor.listen(process.env.PORT || 5000, () => {
})


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

