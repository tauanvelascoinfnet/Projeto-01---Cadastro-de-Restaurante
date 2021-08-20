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
    var cepSemTraco = elementoText.value.replace(/\.|\-/g, '');

    if (cepSemTraco !== "" && cepSemTraco.length == 8) {

        const enderecoBuscaViaCep = "https://viacep.com.br/ws/" + cepSemTraco + "/json/";

        const response = await fetch(enderecoBuscaViaCep);
        const data = await response.json();

        const bairroRetornoCep = data.bairro;
        const ruaRetornoCep = data.logradouro;

        if (bairroRetornoCep !== undefined) {
            bairro.value = bairroRetornoCep;
            rua.value = ruaRetornoCep;
        } else {
            alert("CEP não encontrado.");
            bairro.value = "";
            rua.value = "";
        }

    } else {
        bairro.value = "";
        rua.value = "";
    }
}

function mascaraTelefone(evt) {
    var tel = document.getElementById("telefone");

    var tam = tel.value.length;

    var tecla = evt.keyCode;
    if (tecla != 8) {
        switch (tam) {
            case 1:
                tel.value = "(" + tel.value;
                break;
            case 3:
                tel.value = tel.value + ")";
                break;
            case 8:
                tel.value = tel.value + "-";
                break;
        }
    }
}

function mascaraCelular(evt) {
    var tel = document.getElementById("celular");

    var tam = tel.value.length;

    var tecla = evt.keyCode;
    if (tecla != 8) {
        switch (tam) {
            case 1:
                tel.value = "(" + tel.value;
                break;
            case 3:
                tel.value = tel.value + ")";
                break;
            case 9:
                tel.value = tel.value + "-";
                break;
        }
    }
}

function mascaraCep(evt) {
    var cep = document.getElementById("cep");

    var tam = cep.value.length;

    var tecla = evt.keyCode;
    if (tecla != 8) {
        switch (tam) {
            case 2:
                cep.value = cep.value + ".";
                break;
            case 6:
                cep.value = cep.value + "-";
                break;
        }
    }
}

function mascaraCnpj(evt) {
    var cnpj = document.getElementById("cnpj");

    var tam = cnpj.value.length;

    var tecla = evt.keyCode;
    if (tecla != 8) {
        switch (tam) {
            case 2:
                cnpj.value = cnpj.value + ".";
                break;
            case 6:
                cnpj.value = cnpj.value + ".";
                break;
            case 10:
                cnpj.value = cnpj.value + ".";
                break;
            case 15:
                cnpj.value = cnpj.value + "-";
                break;
        }
    }
}

function somenteNumeros(evt) {
    var tecla = evt.keyCode;
    if (tecla >= 46 && tecla <= 57) {
        return true;
    } else {
        return false;
    }
}

const idsQuery = ['#cnpj', '#telefone', '#celular', '#cep'];

for (let i = 0; i < idsQuery.length; i++) {
    var description = document.querySelector(idsQuery[i]);
    description.addEventListener("paste", function (e) {
        e.preventDefault();
    });
}
