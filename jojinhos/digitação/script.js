const palavras = ["maça", "banana", "laranja", "uva", "morango", "ovo", "felicidade", "amizade"]; // Lista de palavras
let palavraAtualIndex = 0;
let tempoRestante = 60;
let contadorInterval;
const bestTimesKey = "bestTimes";
let bestTimes = JSON.parse(localStorage.getItem(bestTimesKey)) || [];


const wordDisplay = document.getElementById("wordDisplay");
const userInput = document.getElementById("userInput");
const countdownDisplay = document.getElementById("countdown");
const messageDisplay = document.getElementById("message");


function exibirPalavra() {
    wordDisplay.textContent = palavras[palavraAtualIndex];
}


function iniciarContador() {
    contadorInterval = setInterval(() => {
        tempoRestante--;
        countdownDisplay.textContent = tempoRestante + "s";


        if (tempoRestante === 0) {
            clearInterval(contadorInterval);
            messageDisplay.textContent = "Tempo esgotado!";
            userInput.disabled = true;
        }
    }, 1000);
}


function verificarPalavra() {
    const inputValor = userInput.value.trim().toLowerCase();
    const palavraAtual = palavras[palavraAtualIndex];


    if (inputValor === palavraAtual) {
        palavraAtualIndex++;
        userInput.value = "";
        tempoRestante = 60;
        countdownDisplay.textContent = tempoRestante + "s";
        messageDisplay.textContent = "";


        if (palavraAtualIndex < palavras.length) {
            exibirPalavra();
        } else {
            messageDisplay.textContent = "Parabéns, você venceu!";
            clearInterval(contadorInterval);
            userInput.disabled = true;
            const tempoJogado = 60 - tempoRestante;
            atualizarRanking(tempoJogado);
        }
    }
}


userInput.addEventListener("input", verificarPalavra);


exibirPalavra();
iniciarContador();
exibirRanking();


function atualizarRanking(tempo) {
    bestTimes.push(tempo);
    bestTimes.sort((a, b) => a - b);
    bestTimes = bestTimes.slice(0, 5);
    localStorage.setItem(bestTimesKey, JSON.stringify(bestTimes));
}


function exibirRanking() {
    const rankingDisplay = document.getElementById("ranking");
    rankingDisplay.innerHTML = "<h2>Melhores Tempos:</h2>";

    if (bestTimes.length === 0) {
        rankingDisplay.innerHTML += "<p>Ainda não há tempos registrados.</p>";
    } else {
        rankingDisplay.innerHTML += "<ol>";
        bestTimes.forEach((tempo, index) => {
            rankingDisplay.innerHTML += `<li>${index + 1}º: ${tempo}s</li>`;
        });
        rankingDisplay.innerHTML += "</ol>";
    }
}