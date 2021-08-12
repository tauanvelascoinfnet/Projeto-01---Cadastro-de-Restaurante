// aqui fazemos a refatoração das validações, passando o middleware pra cá. assim ele passa a ser reutilizável, com outros schemas
module.exports = (contexto, schema) => {
    return async (req, res, next) => { //criando um middleware pra fazer as validações do post

        const resultado = schema.validate(req[contexto], { abortEarly: false });
        // passa o objeto a ser validado, sem opções de validação, por isso o objeto vazio... essa função retorna outro objeto, por isso precisa 
        //ser atribuido, para ser utilizado, imagino... o abort early faz com que ele não pare quando der o erro na 1a validação, retornando todas

        if (resultado.error) {

            // console.log(resultado.error)

            return res.render("errors", {
                errors: resultado.error.details.map(item => {
                    return item.message
                })
            });
        }

        next();
    };
};
