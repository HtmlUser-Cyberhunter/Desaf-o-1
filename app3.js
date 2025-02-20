let amigos = [];
let sorteados = [];

//Agrega un nombre en la matriz
function agregarAmigo() {
    let nombreAmigo = document.getElementById('amigo');
    let nombre = nombreAmigo.value.trim();

    // Verificar si esta vacio
    if (nombre === "") {
        alert("Por favor, inserte un nombre.");
        return;
    }

    // esto verifica que los datos no tengan numeros
    let validar = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
    if (!validar) {
        alert("Por favor ingresa un nombre válido (solo letras y espacios)");
        return;
    }

    //Añadir el nombre al array de amigos si no está en la matriz
    if (!amigos.includes(nombre)) {
        amigos.push(nombre); //agrega el nombre si no fue agregado anteriormente
    } else {
        alert("Este nombre ya está en la lista.");
    }

    nombreAmigo.value = "";  // Limpia la entrada

    actualizarLista(); 
}

function actualizarLista() {
    let listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ""; // Limpiar la matriz actual

    amigos.forEach((nombre) => {
        let li = document.createElement('li'); //crea una lista
        li.textContent = nombre;
        listaAmigos.appendChild(li); //agrega cada elemento de la lista a la pagina
    });
}

function sortearAmigo() {
    let amigosNoSorteados = amigos.filter(amigo => !sorteados.includes(amigo)); // crea una lista de nombres no sorteados
    if (amigos.length === 0) {
        alert("La lista está vacía. Agrega algunos nombres");
        return;
    }
    if (amigosNoSorteados.length === 0) {
        // Si todos los nombres ya fueron sorteados, reiniciar el sorteo?
        let reiniciar = confirm("Todos los nombres han sido sorteados ¿Deseas reiniciar el sorteo?");
        
        if (reiniciar) {
            reiniciarSorteo(); // Reiniciar el sorteo
        }
        return;
    }

    let nombreSorteo = Math.floor(Math.random() * amigosNoSorteados.length);
    let nombreSorteado = amigosNoSorteados[nombreSorteo];
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = `<li>El amigo secreto es: <strong>${nombreSorteado}</strong></li>`;

    sorteados.push(nombreSorteado); //agrega el nombre sorteado a un array de sorteados

    actualizarLista(); //actualiza la lista despues de cada sorteo
}

function reiniciarSorteo() {
    // Restablece los arrays de nombres y sorteados
    amigos = [];
    sorteados = [];

    // Limpia la interfaz
    document.getElementById('resultado').innerHTML = "";
    document.getElementById('listaAmigos').innerHTML = "";

    alert("El sorteo ha sido reiniciado. Puedes agregar nuevos nombres");
}
