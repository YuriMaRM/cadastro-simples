const ACCOUNTS = [];

function usernameIsValid() { // valida o tamanho do nome 3 < nome > 25
    const name = document.forms["cadastro"]["nome"]; 
    if (name.value.length < 3 || name.value.length > 25) { 
        name.className = "erro"; // Altera a classe para Erro
        document.getElementById("alertNome").innerHTML = "Nome deve ter de 3 a 25 caracteres"; // Adiciona o texto de erro no span
    } else {
        name.className = "certo";
        document.getElementById("alertNome").innerHTML = ""; // caso tenha texto de erro apaga
    }
    buttonIsDisabled(); // Verifica se o botão ainda esta desativado
}
function emailIsValid() { // Valida o email com um regex
    const email = document.forms["cadastro"]["email"];
    if (email.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        /*
            usa a função match para comparar o email com o regex 
         */
        email.className = "certo";
        document.getElementById("alertEmail").innerHTML = "";
    } else {
        email.className = "erro";
        document.getElementById("alertEmail").innerHTML ="Insira um email valido";
    }
    buttonIsDisabled();
}
function passwordIsValid() { // Valida a senha >= 8
    const password = document.forms["cadastro"]["senha"];

    if (password.value.length < 8) {
        password.className = "erro";
        document.getElementById("alertSenha").innerHTML = "Senha muito curta";
    } else {
        password.className = "certo";
        document.getElementById("alertSenha").innerHTML = "";
    }
    confirmPasswordIsValid();// Valida a confirmação de senha
}
function confirmPasswordIsValid() {// Verifica se a senha é igual(===) a confimarção de senha 
    const password = document.forms["cadastro"]["senha"].value;
    const cPassword = document.forms["cadastro"]["Csenha"];

    if (cPassword.value !== password) {
        cPassword.className = "erro";
        document.getElementById("alertCsenha").innerHTML = "O valor deve ser igual a senha";
    } else if (cPassword.value !== "") {// para não ficar certo vazio, me incomodava
        cPassword.className = "certo";
        document.getElementById("alertCsenha").innerHTML = "";
    }
    buttonIsDisabled();
}

function validateForm() {//Valida o formulario e salva os dados caso nos conformes
    document.getElementById("submit").disabled = true;
    setTimeout(() => {
        document.getElementById("submit").disabled = false;
    }, 1000);// desabilita o botão de cadastro por um segundo
    const name = document.forms["cadastro"]["nome"];
    const email = document.forms["cadastro"]["email"];

    let isValid = true;
    // Passa por todo o array ACCOUNTS e verifica se ja existe um nome ou email
    ACCOUNTS.forEach(account => {
        if (account.name === name.value) {
            isValid = false;
            document.getElementById("alertNome").innerHTML = "Nome ja registrado";
            name.className = "erro";
        }
        if (account.email === email.value) {
            isValid = false;
            document.getElementById("alertEmail").innerHTML = "Email ja registrado";
            email.className = "erro";
        }
    });
    /* Passam pelo array salvo verificando caso tenham algum com mesmo nome ou email*/
    if (isValid){ // em caso de dados novos isValid continua true
        ACCOUNTS[ACCOUNTS.length] = {
            name: name.value,
            email: email.value,
            password: document.forms["cadastro"]["senha"].value,
        };
        document.forms["cadastro"].reset();
    }
}

function buttonIsDisabled() {/* Verifica se o estado que o botão deve estar e modifica caso errado */
    const password = document.forms["cadastro"]["senha"];
    const cPassword = document.forms["cadastro"]["Csenha"];
    const name = document.forms["cadastro"]["nome"];
    const email = document.forms["cadastro"]["email"];
    if (
        password.className === "certo" &&
        cPassword.className === "certo" &&
        name.className === "certo" &&
        email.className === "certo"
    ) {// Caso todas estejam com a classe "certo"(verde) o botão de cadastro é desabilitado
        document.getElementById("submit").disabled = false;
    } else document.getElementById("submit").disabled = true;
}