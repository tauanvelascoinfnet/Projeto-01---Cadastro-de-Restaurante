const getHome = (req, res, next) => {
    const novotexto = Date();
  
    res.render("home", { novotexto });
  };
  
  module.exports = {
    getHome,
  };
  