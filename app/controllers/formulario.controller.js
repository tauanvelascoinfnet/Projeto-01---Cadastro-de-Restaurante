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
  nome: Joi.string().max(30).min(5).required().label("Nome: ").custom((value, helpers) => {
    const result = value.split(' ')
    if (result.length > 1) {
      return value;
    }
    // return helpers.error("any.invalid");
    return helpers.error("Nome precisa de pelo menos duas palavras!");
  }), //nome é texto, 30 caracteres máximo, mínimo 5, obrigatório, pelo menos 2 palavras, pra isso a validação com o custom
  data: Joi.date().iso().label("Data: ").required(),
  razaosocial: Joi.string().max(30).min(5).label("Razão Social: ").required(),
  logo: Joi.string().label("Logo: ").required().custom((value, helpers) => {

    const reg = /(?:\.([^.]+))?$/;
    var extensao = reg.exec(value)[1];

    if (extensao == "png" || extensao == "jpeg" || extensao == "jpg") {
      return value;
    } 
    else {
      return helpers.error("A logo precisa ser um link de imagem com extensão png, jpeg ou jpg!");
    }

  }),
  email: Joi.string().email().label("E-mail: ").required(), //email é texto, é e-mail, obrigatório
  cnpj: Joi.string().max(18).min(18).label("CNPJ: ").required(),
  telefone: Joi.string().label("Telefone: ").required().max(13).min(13),
  celular: Joi.string().label("Celular: ").max(14).min(14).allow(""),
  status: Joi.number().label("Status").required(), // depois vai ver como limitar o options
  temfuncionarios: Joi.number().label("Tem Funcionários:").required(),
  numerofuncionarios: Joi.number().label("Número de Funcionários: ").allow(""),
  tiporestaurante: Joi.number().label("Tipo de Restaurante: ").required(),
  cep: Joi.string().label("CEP: ").required().max(10).min(10),
  bairro: Joi.string().label("Bairro: ").max(20).required(),
  rua: Joi.string().label("Rua: ").max(30).required(),
  numero: Joi.number().label("Número: ").required().max(99999),
  complemento: Joi.string().label("Complemento: ").max(25).allow(""), // pra permitir que seja vazio o allow
  referencia: Joi.string().label("Referência: ").max(30).allow(""),
  descricao: Joi.string().max(20).label("Descrição: ").required(),
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