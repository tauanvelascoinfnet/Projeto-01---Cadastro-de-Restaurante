const getFormulario = (req, res, next) => {
    const recebiDoBancoDeDados = ["ailton", "diego", "thiago", "Giulia"];
  
    const filtrados = recebiDoBancoDeDados.filter((item) => item.includes("a"));
  
    res.render("formulario", {
      title: "Liniker é o Professor",
      alunos: recebiDoBancoDeDados,
    });
  };
  
  const postFormulario = (req, res, next) => {
    res.send(req.body);
  };
  
  module.exports = {
    getFormulario,
    postFormulario,
  };