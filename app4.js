let amigos = [];
let sorteados = [];

function agregarAmigo() {
    let nombreAmigo = document.getElementById('amigo');
    let nombre = nombreAmigo.value.trim();

    if (nombre === "") {
        alert("Por favor, inserte un nombre.");
        return;
    }

    let validar = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
    if (!validar) {
        alert("Por favor ingresa un nombre válido (solo letras y espacios)");
        return;
    }

    if (!amigos.includes(nombre)) {
        amigos.push(nombre);
    } else {
        alert("Este nombre ya está en la lista.");
    }

    nombreAmigo.value = "";
    actualizarLista();
}

function actualizarLista() {
    let listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = "";

    amigos.forEach((nombre) => {
        let li = document.createElement('li');
        li.textContent = nombre;
        listaAmigos.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length === 0) {
        alert("La lista está vacía. Agrega algunos nombres");
        return;
    }

    let amigosNoSorteados = amigos.filter(amigo => !sorteados.includes(amigo));

    if (amigosNoSorteados.length === 0) {
        let reiniciar = confirm("Todos los nombres han sido sorteados. ¿Deseas reiniciar el sorteo?");
        if (reiniciar) {
            reiniciarSorteo();
        }
        return;
    }

    let indiceSorteado = Math.floor(Math.random() * amigosNoSorteados.length);
    let nombreSorteado = amigosNoSorteados[indiceSorteado];

    sorteados.push(nombreSorteado);

    let resultado = document.getElementById('resultado');
    resultado.innerHTML = `<li>🎆 El amigo secreto es: <strong>${nombreSorteado}</strong> 🎆</li>`;

    iniciarFuegosArtificiales();

    actualizarLista();
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

// Animación de fuegos artificiales
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.explode();
    }

    explode() {
        for (let i = 0; i < 50; i++) {
            this.particles.push(new Particle(this.x, this.y));
        }
    }

    update() {
        this.particles.forEach(particle => particle.update());
        this.particles = this.particles.filter(particle => particle.alpha > 0);
    }

    draw() {
        this.particles.forEach(particle => particle.draw());
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 1;
        this.speedX = Math.random() * 4 - 3;
        this.speedY = Math.random() * 4 - 3;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.alpha = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 60);
        ctx.fill();
    }
}

function iniciarFuegosArtificiales() {
    let count = 0;
    let intervalo = setInterval(() => {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height * 0.9; // Para que no sea tan bajo
        fireworks.push(new Firework(x, y));
        animar();

        count++;
        if (count >= 10) {
            clearInterval(intervalo); // Detener después de 10 explosiones
        }
    }, 2000); // Retraso de 2000ms entre cada fuego artificial
}
function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.particles.length === 0) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(animar);
}

animar();



