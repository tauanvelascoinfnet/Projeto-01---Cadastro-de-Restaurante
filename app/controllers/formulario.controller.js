const statusModel = require('../models/status.loja.model');
const tipoDeRestauranteModel = require('../models/tipo.de.restaurante.model');
const optionsMapper = require('../utils/mappers/select-options.mapper')

const getFormulario = (req, res, next) => {

  // const recebiDoBancoDeDados = ["ailton", "diego", "thiago", "Giulia"];
  // const filtrados = recebiDoBancoDeDados.filter((item) => item.includes("a"));

  const viewModel = {
    title: "Liniker é o Professor",
    // alunos: recebiDoBancoDeDados,
    //opcaoStatusDefault: 1, // passar uma opção já selecionada
    
    // opcoesStatus: statusModel.listaStatus().map((item) => {
    //   return {
    //     label: item.descricao,
    //     value: item.id
    //   }
    // }),
    
    //Com a criação do mapper, na pasta utils, o codigo acima foi refatorado 
    opcoesStatus: optionsMapper('descricao', 'id', statusModel.listaStatus()),
    opcoesTiposDeRestaurante: optionsMapper('descricao', 'id', tipoDeRestauranteModel.listaTipoRestaurante()),

  }
  res.render("formulario", viewModel);   //passando a view pro ejs que vai construir a tela, depois da virgula é possivel passar outras coisas, como ex. esse título

};

const postFormulario = (req, res, next) => {
  res.send(req.body);
};

module.exports = {
  getFormulario,
  postFormulario,
};