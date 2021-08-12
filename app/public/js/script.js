
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

        bairro.value = bairroRetornoCep;
        rua.value = ruaRetornoCep;
    } else {
        bairro.value = "";
        rua.value = "";
    }
}

const logo = document.getElementsByClassName("logo")[0];

async function carregarLogo() {
    const response = await fetch("https://api.github.com/users/tauanvelascoinfnet");
    const data = await response.json();

        const img = document.createElement("img");
        img.setAttribute("id", "fotoPerfil");
        img.setAttribute("src", data.avatar_url);
        logo.append(img);
}

// var cepMascara = document.getElementById('cep');
// var maskOptions = {
//   mask: '+00000-000'
// };
// var mask = IMask(cepMascara, maskOptions);
// console.log(mask);