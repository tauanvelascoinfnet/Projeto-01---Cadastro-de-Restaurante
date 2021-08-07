const { resolveInclude } = require("ejs")

const statusDB = [
    {
        id: 1,
        descricao: "Ativa"
    },
    {
        id: 2,
        descricao: "Inativa"
    }
]

const listaStatus = () => {
    return statusDB
}

//função de busca de uma opção - no meu projeto não tem uso
const buscaPorId = (id) => {
    const result = statusDB.filter((item) => {
        return item.id === id;
    })
   return result.length > 0 ? result[0] : undefined; // se retornar algo, retorna, senão, devolve undefined 
}

module.exports = {
    listaStatus,
    buscaPorId,
}