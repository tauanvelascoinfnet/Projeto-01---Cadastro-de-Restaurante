const getFormulario = (req, res, next) => {
    const recebiDoBancoDeDados = ["ailton", "diego", "thiago", "Giulia"];
  
    const filtrados = recebiDoBancoDeDados.filter((item) => item.includes("a"));
  
    res.render("formulario", {   //passando a view pra onde vai, depois da virgula é possivel passar outras coisas, como ex. esse título
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