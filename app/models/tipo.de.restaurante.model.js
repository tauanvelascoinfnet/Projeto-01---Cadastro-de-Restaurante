const { resolveInclude } = require("ejs")

const tipoDeRestauranteDB = [
    {
        id: 1,
        descricao: "Comida Brasileira"
    },
    {
        id: 2,
        descricao: "Hamburgueria"
    },
    {
        id: 3,
        descricao: "Pizzaria"
    },
    {
        id: 4,
        descricao: "Comida Japonesa"
    },
    {
        id: 5,
        descricao: "Doceria"
    },
    {
        id: 6,
        descricao: "Sorveteria"
    },
]

const listaTipoRestaurante = () => {
    return tipoDeRestauranteDB
}

//função de busca de uma opção - no meu projeto não tem uso
const buscaPorId = (id) => {
    const result = tipoDeRestauranteDB.filter((item) => {
        return item.id === Number(id);
    })
   return result.length > 0 ? result[0] : undefined; // se retornar algo, retorna, senão, devolve undefined 
}

module.exports = {
    listaTipoRestaurante,
    buscaPorId,
}