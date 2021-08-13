const { resolveInclude } = require("ejs")

const temFuncionariosDB = [
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
    return temFuncionariosDB
}

const buscaPorId = (id) => {
    const result = temFuncionariosDB.filter((item) => {
        return item.id === Number(id);
    })
   return result.length > 0 ? result[0] : undefined; // se retornar algo, retorna, senão, devolve undefined 
}

module.exports = {
    listaTemFuncionarios,
    buscaPorId
}