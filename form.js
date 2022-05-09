var accounts = [];
function usernameIsValid() {
    const name = document.forms["cadastro"]["nome"];
    if (name.value.length < 3 || name.value.length > 25) {
        name.className = "erro";
        document.getElementById("alertNome").innerHTML = "Nome deve ter de 3 a 25 caracteres";
    } else {
        name.className = "certo";
        document.getElementById("alertNome").innerHTML = "";
    }
    buttonIsDisabled();
}
function emailIsValid() {
    const email = document.forms["cadastro"]["email"];
    if (email.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        email.className = "certo";
        document.getElementById("alertEmail").innerHTML = "";
    } else {
        email.className = "erro";
        document.getElementById("alertEmail").innerHTML ="Insira um email valido";
    }
    buttonIsDisabled();
}
function passwordIsValid() {
    const password = document.forms["cadastro"]["senha"];

    if (password.value.length < 8) {
        password.className = "erro";
        document.getElementById("alertSenha").innerHTML = "Senha muito curta";
    } else {
        password.className = "certo";
        document.getElementById("alertSenha").innerHTML = "";
    }
    confirmPasswordIsValid();
}
function confirmPasswordIsValid() {
    const password = document.forms["cadastro"]["senha"].value;
    const cPassword = document.forms["cadastro"]["Csenha"];

    if (cPassword.value !== password) {
        cPassword.className = "erro";
        document.getElementById("alertCsenha").innerHTML = "O valor deve ser igual a senha";
    } else if (cPassword.value !== "") {
        cPassword.className = "certo";
        document.getElementById("alertCsenha").innerHTML = "";
    }
    buttonIsDisabled();
}

function validateForm() {
    document.getElementById("submit").disabled = true;
    setTimeout(() => {
        document.getElementById("submit").disabled = false;
    }, 1000);
    const name = document.forms["cadastro"]["nome"];
    const email = document.forms["cadastro"]["email"];

    let isValid = true;
    accounts.forEach(account => {
        if (account.name === name.value) {
            isValid = false;
            document.getElementById("alertNome").innerHTML = "Nome ja registrado";
            name.className = "erro";
        }
    });
    accounts.forEach(account => {
        if (account.email === email.value) {
            isValid = false;
            document.getElementById("alertEmail").innerHTML = "Email ja registrado";
            email.className = "erro";
        }
    });
    if (isValid) {
        accounts[accounts.length] = {
            name: name.value,
            email: email.value,
            password: document.forms["cadastro"]["senha"].value,
        };
    }
}

function buttonIsDisabled() {
    const password = document.forms["cadastro"]["senha"];
    const cPassword = document.forms["cadastro"]["Csenha"];
    const name = document.forms["cadastro"]["nome"];
    const email = document.forms["cadastro"]["email"];
    if (
        password.className === "certo" &&
        cPassword.className === "certo" &&
        name.className === "certo" &&
        email.className === "certo"
    ) {
        document.getElementById("submit").disabled = false;
    } else document.getElementById("submit").disabled = true;
}