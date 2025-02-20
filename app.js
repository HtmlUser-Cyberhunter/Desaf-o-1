// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigos = [];
let conteo=1;

function agregarAmigo() {
    let nombreInput = document.getElementById('amigo');
    let nombre = nombreInput.value.trim();

    // Validación de los datos
    if (nombre === "") {
        alert("Por favor, inserte un nombre.");
        return;
    }
    // Validar que el nombre no contenga números
    let validar = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre); //Solo acepta letras
    if (!validar) {
        alert("Por favor, ingresa un nombre válido (solo letras y espacios)."); //si no es valido coloca una alerta
        return;
    }

    amigos.push(nombre);
    nombreInput.value = "";
    actualizarLista();
}

function actualizarLista() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ""; // Limpia la lista actual

    amigos.forEach((nombre) => {
        const li = document.createElement('li');
        li.textContent = nombre;
        listaAmigos.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length === 0) {
        alert("¡La lista está vacía! Agrega algunos amigos.");
        return;
    }
    let sorteo = Math.floor(Math.random() * amigos.length);
    let amigoSorteado = amigos[sorteo];

    let resultado = document.getElementById('resultado');
    resultado.innerHTML = `<li>El amigo secreto es: <strong>${amigoSorteado}</strong></li>`;             
        
}

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}
function condicionesIniciales(){
    asignarTextoElemento('h2','Digite el nombre de sus amigos');
    listaAmigos=[];
    numeroSecreto = generarNumeroSecreto();
    resultado="";
}
function limpiarCaja(){
    //let valorCaja = document.querySelector('#valorUsuario');
    //valorCaja.value=''; para reducir esto se coloca lo siguiente:
    document.querySelector('#amigo').value = '';
    document.querySelector('#listaAmigos').value = '';
    document.querySelector('#resultado').value = '';
}

function reiniciarSorteo(){
    limpiarcaja();
    condicionesIniciales();    
}

condicionesIniciales();
