const palavras = ["aviao", "cachorro", "pato", "bola", "amor", "primavera",
    "raiva", "dor", "sofrimento", "desespero", "tristeza", "odio", "depressao", "ovo"
];
const palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
const letrasErradas = [];
const letrasCorretas = [];


document.addEventListener("keydown", (evento) => {
    const codigo = evento.keyCode;
    if (isLetra(codigo)) {
        const letra = evento.key;
        if (letrasErradas.includes(letra)) {
            mostrarAvisoDeLetraRepitida();
        } else {
            if (palavraSecreta.includes(letra)) {
                letrasCorretas.push(letra);
            } else {
                letrasErradas.push(letra);
            }
        }


        atulizarJogo();
    }


})


function atulizarJogo() {
    mostrarLetrasErradas();
    mostrarLetrasCertas();
    desenharForca();
    checarJogo();
}


function mostrarLetrasErradas() {
    const div = document.querySelector(".letras-erradas-container");
    div.innerHTML = "<h3>Letras erradas</h3>";
    letrasErradas.forEach(letra => {
        div.innerHTML += `<span>${letra}</span>`;
    })
}


function mostrarLetrasCertas() {
    const container = document.querySelector(".palavra-secreta-container");
    container.innerHTML = "";
    palavraSecreta.split("").forEach(letra => {
        if (letrasCorretas.includes(letra)) {
            container.innerHTML += `<span>${letra}</span>`;
        } else {
            container.innerHTML += `<span>_</span>`;
        }
    });
}


function checarJogo() {
    let mensagem = "";
    const corpoParte = document.querySelectorAll(".forca-parte");
    const container = document.querySelector(".palavra-secreta-container");
    if (letrasErradas.length === corpoParte.length) {
        mensagem = "Você Perdeu! Seu jegue!";
    }


    if (palavraSecreta === container.innerText) {
        mensagem = "Parabéns! Você Ganhou!";
    }


    if (mensagem) {
        document.querySelector("#mensagem").innerHTML = mensagem;
        document.querySelector(".popup-container").style.display = "flex";
    }
}


function desenharForca() {
    const corpoParte = document.querySelectorAll(".forca-parte");
    for (let i = 0; i < letrasErradas.length; i++) {
        corpoParte[i].style.display = "block";
    }
}




function mostrarAvisoDeLetraRepitida() {
    const aviso = document.querySelector(".aviso-palavra-repetida");
    aviso.classList.add("show");
    setTimeout(() => {
        aviso.classList.remove("show");
    }, 1000)
}


function isLetra(codigo) {
    return codigo => 65 && codigo <= 90;
}


function reiniciarJogo() {
    location.reload();
}