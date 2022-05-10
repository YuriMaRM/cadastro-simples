window.onclick = function (event) { //fecha o modal se clicando fora
    if (event.target == modal)
        modal.style.display = "none"; //Faz o modal desaparecer
};
function login() { // faz o modal aparecer
    modal.style.display = "flex";// tira o display none(deixa visivel)
}