const quadros = document.querySelectorAll('.quadro');
const cores = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#e67e22'];
let sequencia = [];
let nivel = 1;
let sequenciaUsuario = [];
let jogando = false;


function piscarSequencia() {
    jogando = false;
    for (let i = 0; i < sequencia.length; i++) {
        setTimeout(() => {
            quadros[sequencia[i]].style.backgroundColor = cores[sequencia[i]];
            setTimeout(() => {
                quadros[sequencia[i]].style.backgroundColor = '#3498db';
                if (i === sequencia.length - 1) {
                    jogar();
                }
            }, 500);
        }, i * 1000);
    }
}


function gerarSequencia() {
    sequencia = [];
    for (let i = 0; i < nivel; i++) {
        sequencia.push(Math.floor(Math.random() * 6));
    }
}


function jogar() {
    sequenciaUsuario = [];
    jogando = true;
}


quadros.forEach((quadro, index) => {
    quadro.addEventListener('click', () => {
        if (jogando) {
            quadro.style.backgroundColor = cores[index];
            setTimeout(() => {
                quadro.style.backgroundColor = '#3498db';
            }, 300);
            sequenciaUsuario.push(index);
            verificar();
        }
    });
});


function verificar() {
    for (let i = 0; i < sequenciaUsuario.length; i++) {
        if (sequenciaUsuario[i] !== sequencia[i]) {
            gameOver();
            return;
        }
    }
    if (sequenciaUsuario.length === sequencia.length) {
        nivel++;
        proximoNivel();
    }
}


function proximoNivel() {
    gerarSequencia();
    setTimeout(() => {
        piscarSequencia();
    }, 1000);
}


function gameOver() {
    alert(`Game Over! Sua pontuação: ${nivel - 1}`);
    nivel = 1;
    gerarSequencia();
    piscarSequencia();
}


gerarSequencia();
piscarSequencia();