// const IMask = require('imask');

// var cep = document.getElementsById('cep');
// var maskOptionsCEP = {
//     mask: '00000-000'
// };
// var mask = IMask(cep, maskOptionsCEP);

// var CNPJ = document.getElementsById('cnpj');
// var maskOptionsCNPJ = { 
//     maskCNPJ: '00.000.000/0000-00'
// };

// var maskCNPJ = IMask(CNPJ, maskOptionsCNPJ);



function onChangeRadioButtonTemFuncionario(elementoRadio) {

    const numeroFuncionarios = document.getElementById("numerofuncionarios");
    if (elementoRadio.value === '1') {
        numeroFuncionarios.disabled = false;
    } else {
        numeroFuncionarios.disabled = true;
        numeroFuncionarios.value = "";
    }
}

const datacadastro = document.getElementById("datacadastro");
datacadastro.value = new Date().toISOString().substring(0, 10);

async function onChangeBuscaCep(elementoText) {
    const bairro = document.getElementById("bairro");
    const rua = document.getElementById("rua");

    if (elementoText.value !== "" && elementoText.value.length == 8) {
        const enderecoBuscaViaCep = "https://viacep.com.br/ws/" + elementoText.value + "/json/";

        const response = await fetch(enderecoBuscaViaCep);
        const data = await response.json();

        const bairroRetornoCep = data.bairro;
        const ruaRetornoCep = data.logradouro;

        if (bairroRetornoCep !== undefined) {
            bairro.value = bairroRetornoCep;
            rua.value = ruaRetornoCep;
        } else {
            bairro.value = "";
            rua.value = "";
        }

    } else {
        bairro.value = "";
        rua.value = "";
    }
}

