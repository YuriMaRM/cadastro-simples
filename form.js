var accounts = [];
function usernameIsValid(){
    let name = document.forms["cadastro"]["nome"].value;
    let input = document.getElementById("nome");
    if(name.length < 3 || name.length > 25){
        input.className= "erro";
        document.getElementById("alertNome").innerHTML = "Nome deve ter de 3 a 25 caracteres";
    }else{ 
        input.className= "certo";
        document.getElementById("alertNome").innerHTML = "";
    }
    buttonIsDisabled();
}
function emailIsValid(){
    let email = document.forms["cadastro"]["email"].value;
    let input = document.getElementById("email");
    if(email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        input.className= "certo";
        document.getElementById("alertEmail").innerHTML = "";
    }else{
        input.className = "erro";
        document.getElementById("alertEmail").innerHTML = "Insira um email valido";
    }
    buttonIsDisabled();
}
function passwordIsValid(){
    let password = document.forms["cadastro"]["senha"].value;
    let cPassword = document.forms["cadastro"]["Csenha"].value;
    let inputSenha = document.getElementById("senha");
    let inputConf = document.getElementById("Csenha");

    if(password.length < 8){
        inputSenha.className = "erro";
        document.getElementById("alertSenha").innerHTML = "Senha muito curta";
    }else{
        inputSenha.className = "certo";
        document.getElementById("alertSenha").innerHTML = "";
    }

    if(cPassword !== "" && cPassword !== password){
        inputConf.className = "erro";
        document.getElementById("alertCsenha").innerHTML = "O valor deve ser iagua a senha";
    }else if(cPassword !== ""){
        inputConf.className = "certo";
        document.getElementById("alertCsenha").innerHTML = "";
    }
    buttonIsDisabled();
    
}

function validateForm(){
    document.forms["cadastro"]["submit"].disabled = true
    setTimeout(() => {document.forms["cadastro"]["submit"].disabled = false}, 1000);
    const name = document.forms["cadastro"]["nome"].value;
    const email = document.forms["cadastro"]["email"].value;
    const inputName = document.getElementById("nome");
    const inputEmail = document.getElementById("email");

    let isValid = true;
    accounts.forEach(account => {
        if(account.name === name){
            isValid = false;
            document.getElementById("alertNome").innerHTML = "Nome ja registrado";
            inputName.className = "erro";
        }
    });
    accounts.forEach(account => {
        if(account.name === name){
            isValid = false;
            document.getElementById("alertEmail").innerHTML = "Email ja registrado";
            inputEmail.className = "erro";
        }
    });
    if(isValid){
        accounts[accounts.length] = {
            name: name,
            email: email,
            password: document.forms["cadastro"]["senha"].value
        };
    }
}

function buttonIsDisabled(){
    let inputSenha = document.getElementById("senha");
    let inputConf = document.getElementById("Csenha");
    let inputNome = document.getElementById("nome");
    let email = document.getElementById("email");
    if(
        inputSenha.className === "certo" && 
        inputConf.className === "certo" &&  
        inputNome.className === "certo" &&  
        email.className === "certo"
    ){
        document.getElementById("submit").disabled = false;
    }else 
        document.getElementById("submit").disabled = true;
}