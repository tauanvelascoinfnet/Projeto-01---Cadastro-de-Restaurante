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
datacadastro.value = new Date().toISOString().substring(0,10);
