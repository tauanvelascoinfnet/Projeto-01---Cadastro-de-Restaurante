const getHome = (req, res, next) => {
     const novotexto = Date();
    // res.send(novotexto); // com isso, sem o render ele imprime a data, mas poderia ter um html, texto, etc. Mas a pagina 
    //sera construida com o ejs
    
    res.render("home", { novotexto }); // normalmente passa atribuindo, tipo novotexto = "jaboticaba", mas como o nome é igual 
    //ao que está sendo passado, que é essa constante, pode colocar um só... 
  };
  
  module.exports = {
    getHome,
  };
  