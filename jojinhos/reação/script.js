let inicio;
let jogando = false;
let tempos = [];


// começa o jogo
function iniciarJogo() {
    if (!jogando) {
        jogando = true;
        const alvo = document.getElementById("alvo");
        alvo.style.backgroundColor = "red";
        inicio = Date.now();


        setTimeout(alterarCor, getTempoAleatorio());
    }
}


//Altera a cor de vermelho para verde
function alterarCor() {
    if (jogando) {
        const alvo = document.getElementById("alvo");
        alvo.style.backgroundColor = "green";
        inicio = Date.now();


        setTimeout(alterarCor, getTempoAleatorio());
    }
}


//Verifica se você clicou no verde
function verificarTempo() {
    if (jogando) {
        const alvo = document.getElementById("alvo");
        if (alvo.style.backgroundColor === "green") {
            const fim = Date.now();
            const tempoTotal = (fim - inicio) / 1000;


            mostrarResultado(tempoTotal);
            jogando = false;
        }
    }
}


function getCorAleatoria() {
    //Deixa a cor da div aleatoria
    const letras = "0123456789ABCDEF";
    let cor = "#";
    for (let i = 0; i < 6; i++) {
        cor += letras[Math.floor(Math.random() * 16)];
    }
    return cor;
}


function getTempoAleatorio() {
    //Retorna tempo randomico
    return Math.floor(Math.random() * 4000) + 1000;
}


//Mostra o tempo atual e o ranking com os cinco melhores
function mostrarResultado(tempoTotal) {
    const temporizador = document.getElementById("temporizador");
    temporizador.innerText = `Seu tempo: ${tempoTotal.toFixed(2)} segundos`;


    tempos.push(tempoTotal);
    tempos.sort((a, b) => a - b);
    const cincoMelhores = tempos.slice(0, 5);


    const ranking = document.getElementById("ranking");
    ranking.innerHTML = "Melhores tempos:<br>";
    cincoMelhores.forEach((tempo, indice) => {
        ranking.innerHTML += `${indice + 1}. ${tempo.toFixed(2)} segundos<br>`;
    });
}
// :)