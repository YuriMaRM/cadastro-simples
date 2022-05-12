const ACCOUNTS = [];
const regexEmail =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function usernameIsValid() {// valida o tamanho do nome 3 < nome > 25
    const name = document.forms["cadastro"]["nome"].value;
    responseHandler(name.length < 3 || name.length > 25 ? false : true, "nome");
}

function emailIsValid() {// Valida o email com um regex
    const email = document.forms["cadastro"]["email"].value;
    responseHandler(email.match(regexEmail), "email"); //usa a função match para comparar o email com o regex
}

function passwordIsValid() {// Valida a senha >= 8
    const password = document.forms["cadastro"]["senha"].value;
    responseHandler(password.length < 8 ? false : true, "senha");
    confirmPasswordIsValid(); // Valida a confirmação de senha
}

function confirmPasswordIsValid() {// Verifica se a senha é igual(===) a confimarção de senha
    const password = document.forms["cadastro"]["senha"].value;
    const cPassword = document.forms["cadastro"]["Csenha"].value;
    responseHandler(cPassword === password ? true : false, "Csenha");
}

function disableButton() {/* Verifica se o estado que o botão deve estar e modifica caso errado */
    if (
        document.forms["cadastro"]["senha"].className === "certo" &&
        document.forms["cadastro"]["Csenha"].className === "certo" &&
        document.forms["cadastro"]["nome"].className === "certo" &&
        document.forms["cadastro"]["email"].className === "certo"
    ) {// Caso todas estejam com a classe "certo"(verde) o botão de cadastro é desabilitado
        document.getElementById("submit").disabled = false;
    } else document.getElementById("submit").disabled = true;
}

function responseHandler(isValid, elementName, registred = false) {
    let text = "";
    document.forms["cadastro"][elementName].className = isValid? "certo" : "erro";
    if (!isValid)
        switch (elementName) {
            case "nome":
                if (registred) text = "Nome ja registrado";
                else text = "Nome deve ter de 3 a 25 caracteres";
                break;
            case "email":
                if (registred) text = "Email ja registrado";
                else text = "Insira um email valido";
                break;
            case "senha":
                text = "Senha muito curta";
                break;
            case "Csenha":
                text = "O valor deve ser igual a senha";
            default:
                break;
        }
    document.getElementById(elementName + "Erro").innerHTML = text;
    disableButton();
}

function isRegistred() {
    let isValid = true;
    ACCOUNTS.forEach(account => {
        if (account.name === document.forms["cadastro"]["nome"].value) {
            responseHandler(false, "nome", true);
            isValid = false;
        }
        if (account.email === document.forms["cadastro"]["email"].value) {
            responseHandler(false, "email", true);
            isValid = false;
        }
    });
    return isValid;
}

function formValidate() {
    if (isRegistred()) {
        ACCOUNTS[ACCOUNTS.length] = {
            name: document.forms["cadastro"]["nome"].value,
            email: document.forms["cadastro"]["email"].value,
            password: document.forms["cadastro"]["senha"].value,
        };
        document.forms["cadastro"].reset();
        for (const input in document.forms["cadastro"])
            if(document.forms["cadastro"][input])
                document.forms["cadastro"][input].className = "";
    }
}
function submitForm(){
    document.getElementById("submit").disabled = true;
    formValidate();
    setTimeout(()=>{}, 1000);
    
}
