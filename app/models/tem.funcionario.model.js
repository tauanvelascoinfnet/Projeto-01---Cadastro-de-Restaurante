const { resolveInclude } = require("ejs")

const statusDB = [
    {
        id: 1,
        descricao: "Sim"
    },
    {
        id: 2,
        descricao: "Não"
    }
]

const listaTemFuncionarios = () => {
    return statusDB
}

module.exports = {
    listaTemFuncionarios
}