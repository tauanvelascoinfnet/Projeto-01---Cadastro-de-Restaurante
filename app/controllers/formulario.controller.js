const statusModel = require('../models/status.loja.model');
const tipoDeRestauranteModel = require('../models/tipo.de.restaurante.model');
const temFuncionarioModel = require('../models/tem.funcionario.model');
const optionsMapper = require('../utils/mappers/select-options.mapper')
const Joi = require("joi"); // importando a biblioteca do joi pra usar como validador do post

const getFormulario = (req, res, next) => {

  const viewModel = {
    nome: null,
    title: "Liniker é o Professor",
    // alunos: recebiDoBancoDeDados,
    //opcaoStatusDefault: 1, // passar uma opção já selecionada

    opcoesStatus: optionsMapper('descricao', 'id', statusModel.listaStatus()),
    opcoesTiposDeRestaurante: optionsMapper('descricao', 'id', tipoDeRestauranteModel.listaTipoRestaurante()),
    opcoesTemFuncionario: optionsMapper('descricao', 'id', temFuncionarioModel.listaTemFuncionarios()),

  }
  res.render("formulario", viewModel);   //passando a view pro ejs que vai construir a tela, depois da virgula é possivel passar outras coisas, como ex. esse título

};

const postFormulario = (req, res, next) => {
  res.send(req.body);
};

//abaixo temos que criar o schema pra colocar as regras para a validação
const postFormularioSchema = Joi.object({
  nome: Joi.string().max(30).min(5).required().custom((value, helpers) => {
    const result = value.split(' ')
    if (result.length > 1) {
      return value;
    }
    return helpers.error("any.invalid");
  }), //nome é texto, 30 caracteres máximo, mínimo 5, obrigatório, pelo menos 2 palavras, pra isso a validação com o custom
  razaoSocial: Joi.string().max(30).min(5).required(),
  email: Joi.string().email().required(), //email é texto, é e-mail, obrigatório
  cnpj: Joi.number().required().max(14).min(14),
  telefone: Joi.number().required().max(11).min(11),
  status: Joi.number().required(), // depois vai ver como limitar o options
  funcionarios: Joi.number().required(),
  tipoDeRestaurante: Joi.number().required(),
  cep: Joi.number().required().max(8).min(8),
  bairro: Joi.string().max(20).required(),
  rua: Joi.string().max(40).required(),
  numero: Joi.number().required().max(6),
  complemento: Joi.string().max(25),
  referencia: Joi.string().max(30),
  descricao: Joi.string().required(),
});
//}).unknown(true); // permite que receba valores neste momento que ele não conhece no esquema... (coisas a mais, por ex) 

module.exports = {
  getFormulario,
  postFormulario,
  postFormularioSchema
};