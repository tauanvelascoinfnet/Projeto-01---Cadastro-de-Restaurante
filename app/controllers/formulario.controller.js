const statusModel = require('../models/status.loja.model');
const tipoDeRestauranteModel = require('../models/tipo.de.restaurante.model');
const temFuncionarioModel = require('../models/tem.funcionario.model');
const optionsMapper = require('../utils/mappers/select-options.mapper')

const fs = require("fs");
const Joi = require("joi"); // importando a biblioteca do joi pra usar como validador do post
const ejs = require("ejs");
const htmlToPdf = require("html-pdf-node");
const path = require("path");

const getFormulario = (req, res, next) => {
  // construindo viewmodel  
  const viewModel = {
    opcoesStatus: optionsMapper('descricao', 'id', statusModel.listaStatus()),
    opcoesTiposDeRestaurante: optionsMapper('descricao', 'id', tipoDeRestauranteModel.listaTipoRestaurante()),
    opcoesTemFuncionario: optionsMapper('descricao', 'id', temFuncionarioModel.listaTemFuncionarios()),
  }
  res.render("formulario", viewModel);   //passando a viewmodel pro ejs que vai construir a tela, depois da virgula é possivel passar outras coisas, como ex. esse título
};

const postFormulario = (req, res, next) => {
  
  //TODO: montar o viewmodel do pdf

  const { nome, data, razaosocial, logo, email, cnpj, telefone, celular, status, temfuncionarios, numerofuncionarios, tiporestaurante,
          cep, bairro, rua, numero, complemento, referencia, descricao} = req.body; // pegandopost do body as informações
  //usando os métodos pra pegar o label, não o id, que é o que tá passando no post do body
  const statusSelecionado = statusModel.buscaPorId(status).descricao;
  const temFuncionariosSelecionado = temFuncionarioModel.buscaPorId(temfuncionarios).descricao;
  const tipoFestauranteSelecionado = tipoDeRestauranteModel.buscaPorId(tiporestaurante).descricao;

  // construindo o objeto com as informações pra entregar pro template
  const pdfViewModel = {
    nome, data, razaosocial, logo, email, cnpj, telefone, celular, status: statusSelecionado, temfuncionarios: temFuncionariosSelecionado,
    numerofuncionarios, tiporestaurante: tipoFestauranteSelecionado, cep, bairro, rua, numero, complemento, referencia, descricao,
  };

  //TODO: montar o html

  const filePath = path.join(__dirname, "../views/formulario-pdf.ejs");

  console.log(filePath);

  const templateHtml = fs.readFileSync(filePath, 'utf8');
  
  //TODO: montar o pdf
  const htmlPronto = ejs.render(templateHtml, pdfViewModel);

  //TODO: retornar o pdf

  const file = {
    content: htmlPronto  
  };

  const configuracoes = {
    format: 'A4',
    printBackground: true
  };

  htmlToPdf.generatePdf(file, configuracoes)
  .then((resultPromessa) => { // gatilho para quando terminar o sucesso dessa promessa
      res.contentType("application/pdf"); // o resultado será um arquivo .pfd. se não colocar isso, ele fará o download de um arquivo, ao invés de exibir o pdf
      res.send(resultPromessa); // ordem pra enviar o arquivo que foi gerado
    });

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
  data: Joi.date().required(),
  razaosocial: Joi.string().max(30).min(5).required(),
  logo:Joi.string().required(), 
  email: Joi.string().email().required(), //email é texto, é e-mail, obrigatório
  cnpj: Joi.number().required().max(14).min(14),
  telefone: Joi.string().required(),
  celular: Joi.string(),
  status: Joi.number().required(), // depois vai ver como limitar o options
  temfuncionarios: Joi.number().required(),
  numerofuncionarios: Joi.number().required(),
  tiporestaurante: Joi.number().required(),
  cep: Joi.number().required().max(8).min(8),
  bairro: Joi.string().max(20).required(),
  rua: Joi.string().max(40).required(),
  numero: Joi.number().required().max(6),
  complemento: Joi.string().max(25).allow(""), // pra permitir que seja vazio
  referencia: Joi.string().max(30),
  descricao: Joi.string().required(),
});
//}).unknown(true); // permite que receba valores neste momento que ele não conhece no esquema... (coisas a mais, por ex) 

module.exports = {
  getFormulario,
  postFormulario,
  postFormularioSchema
};