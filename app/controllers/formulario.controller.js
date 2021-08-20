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
    cep, bairro, rua, numero, complemento, referencia, descricao } = req.body; // pegandopost do body as informações
  //usando os métodos pra pegar o label, não o id, que é o que tá passando no post do body
  const statusSelecionado = statusModel.buscaPorId(status).descricao;
  const temFuncionariosSelecionado = temFuncionarioModel.buscaPorId(temfuncionarios).descricao;
  const tipoFestauranteSelecionado = tipoDeRestauranteModel.buscaPorId(tiporestaurante).descricao;
  var dataFormatada = new Date(data);
  dataFormatada.setDate(dataFormatada.getDate() + 1);

  // construindo o objeto com as informações pra entregar pro template
  const pdfViewModel = {
    nome, data: dataFormatada.toLocaleDateString(), razaosocial, logo, email, cnpj, telefone, celular, status: statusSelecionado, temfuncionarios: temFuncionariosSelecionado,
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
  }).messages({
    'string.empty': "O campo 'Nome' precisa ser preenchido!",
    'any.invalid': "O campo 'Nome' precisa de pelo menos duas palavras!",
    'string.min': "O campo 'Nome' precisa de pelo menos 5 caracteres!"
  }), //nome é texto, 30 caracteres máximo, mínimo 5, obrigatório, pelo menos 2 palavras, pra isso a validação com o custom
  data: Joi.date().iso().label("Data: ").required().messages({
    'date.empty': "O campo 'Data' precisa ser preenchido!"
  }),
  razaosocial: Joi.string().max(40).min(5).required().messages({
    'string.empty': "O campo 'Razão Social' precisa ser preenchido!",
    'string.min': "O campo 'Razão Social' precisa de pelo menos 5 caracteres!",
    'string.max': "O campo 'Razão Social' pode ter no máximo 40 caracteres!"
  }),
  logo: Joi.string().required().custom((value, helpers) => {

    const reg = /(?:\.([^.]+))?$/;
    var extensao = reg.exec(value)[1];

    if (extensao == "png" || extensao == "jpeg" || extensao == "jpg") {
      return value;
    } 
    else {
      return helpers.error("any.invalid");
      // return helpers.error("A logo precisa ser um link de imagem com extensão png, jpeg ou jpg!");
    }
  }).messages({
    'any.invalid': "A logo precisa ser um link de imagem com extensão png, jpeg ou jpg!",
    'any.required': "O campo 'Logo' precisa ser preenchido!"
  }),
  email: Joi.string().email().required().messages({
    'string.empty': "O campo 'E-mail' precisa ser preenchido!",
    'string.email': "O campo 'E-mail' precisa de um e-mail válido!"
  }), //email é texto, é e-mail, obrigatório
  cnpj: Joi.string().max(18).min(18).required().messages({
    'string.empty': "O campo 'CNPJ' precisa ser preenchido!",
    'string.min': "O campo 'CNPJ' precisa ter 14 dígitos!",
    'string.max': "O campo 'CNPJ' precisa ter 14 dígitos!"
  }),
  telefone: Joi.string().required().max(13).min(13).messages({
    'string.empty': "O campo 'Telefone' precisa ser preenchido!",
    'string.min': "O campo 'Telefone' precisa ter 10 dígitos (DDD + número)!",
    'string.max': "O campo 'Telefone' precisa ter 10 dígitos (DDD + número)!"
  }),
  celular: Joi.string().max(14).min(14).allow("").messages({
    'string.min': "O campo 'Celular' precisa ter 11 dígitos (DDD + número)!",
    'string.max': "O campo 'Celular' precisa ter 11 dígitos (DDD + número)!"
  }),
  status: Joi.number().required().messages({
    'number.empty': "O campo 'Status' precisa ser escolhido!"
  }), 
  temfuncionarios: Joi.number().required().messages({
    'number.empty': "O campo 'Funcionários' precisa ser preenchido!"
  }),
  numerofuncionarios: Joi.number().allow("").max(100).messages({
    'number.max': "No máximo 100 funcionários! Burguês safado!"
  }),
  tiporestaurante: Joi.number().required().messages({
    'number.empty': "O campo 'Tipo de Restaurante' precisa ser escolhido!"
  }),
  cep: Joi.string().required().max(10).min(10).messages({
    'string.empty': "O campo 'CEP' precisa ser preenchido!",
    'string.min': "O campo 'CEP' precisa ter 8 dígitos!",
    'string.max': "O campo 'CEP' precisa ter 8 dígitos!"
  }),
  bairro: Joi.string().max(25).required().messages({
    'string.empty': "O campo 'Bairro' precisa ser preenchido!",
    'string.max': "O campo 'Bairro' pode ter no máximo 25 caracteres!"
  }),
  rua: Joi.string().max(40).required().messages({
    'string.empty': "O campo 'Rua' precisa ser preenchido!",
    'string.max': "O campo 'Rua' pode ter no máximo 40 caracteres!"
  }),
  numero: Joi.number().required().max(99999).messages({
    'number.empty': "O campo 'Número' precisa ser preenchido!",
    'number.max': "O campo 'Número' pode ter no máximo 5 dígitos!"
  }),
  complemento: Joi.string().max(25).allow("").messages({ // pra permitir que seja vazio, o allow
    'string.max': "O campo 'Complemento' pode ter no máximo 25 caracteres!"
  }), 
  referencia: Joi.string().max(30).allow("").messages({ 
    'string.max': "O campo 'Referência' pode ter no máximo 30 caracteres!"
  }),
  descricao: Joi.string().max(400).required().messages({
    'string.empty': "O Descrição Nome precisa ser preenchido!",
    'string.max': "O campo Descrição pode ter no máximo 400 caracteres!"
  }),
  // });
}).unknown(true); // permite que receba valores neste momento que ele não conhece no esquema... (coisas a mais, por ex) 

const getFormularioSchema = Joi.object({
  teste: Joi.number().required(),
});

module.exports = {
  getFormulario,
  postFormulario,
  postFormularioSchema,
  getFormularioSchema
};