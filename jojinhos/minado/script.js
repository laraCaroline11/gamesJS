const canvas = document.getElementById('jogo');
const ctx = canvas.getContext('2d');


var blocos = [];
const nBlocsX = 10;
const nBlocsY = 10;
const nBombas = 10; // Definir o número de bombas
var blocosAbertos = 0;


class Bloco {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.isBomba = false;
        this.isAberto = false;
        this.bombasPerBloc = 0;
        this.marcada = false;
        this.abertoAoRedor = false;
    }
}


function geraBlocos() {
    for (let i = 0; i < nBlocsX; i++) {
        for (let j = 0; j < nBlocsY; j++) {
            let bloco = new Bloco(i, j);
            blocos.push(bloco);
        }
    }
}


function geraBombas() {
    for (let i = 0; i < nBombas; i++) {
        let random = Math.floor(Math.random() * blocos.filter(t => !t.isBomba).length);
        blocos.filter(t => !t.isBomba)[random].isBomba = true;
    }
}


function gerarNumDeBombs() {
    blocos.map(t => {
        const nBombas = calculaNumDeBombasAoRedor(t);
        t.bombasPerBloc = nBombas;
    })
}


function calculaNumDeBombasAoRedor(bloco) {
    let contador = 0;
    for (let i = bloco.i - 1; i <= bloco.i + 1; i++) {
        for (let j = bloco.j - 1; j <= bloco.j + 1; j++) {
            if (i !== bloco.i || j !== bloco.j) {
                if (getBloco(i, j) ?.isBomba) contador += 1;
            }
        }
    }
    return contador;
}


function getBloco(i, j) {
    return blocos.find(t => t.i === i && t.j === j)
}


geraBlocos();
geraBombas();
gerarNumDeBombs();


function draw() {
    blocos.map(t => {
        drawBloco(t);
    })
}


function drawBloco(bloco) {
    let x = (bloco.i * 51) + 1;
    let y = (bloco.j * 51) + 1;
    if (bloco.isAberto) {
        if (bloco.isBomba) {
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(x, y, 50, 50);
            Swal.fire({
                icon: 'error',
                title: 'Game Over!',
                text: 'Você explodiu uma bomba 😥!',
                confirmButtonText: 'Tentar de Novo'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            })
        } else {
            ctx.fillStyle = "#e2d3d3";
            ctx.fillRect(x, y, 50, 50);
            if (bloco.bombasPerBloc) {
                ctx.font = "30px Arial";
                ctx.textAlign = "center";
                ctx.fillStyle = "red";
                ctx.fillText(bloco.bombasPerBloc, x + 25, y + 38);
            }
        }
    } else {
        if (bloco.marcada) {
            ctx.fillStyle = "#0000ff";
        } else {
            ctx.fillStyle = "#aaaaaa";
        }
        ctx.fillRect(x, y, 50, 50);
    }
}


function abreBlocos(bloco) {
    if (!bloco.isAberto) {
        bloco.isAberto = true;
        blocosAbertos++;
        if (!bloco.abertoAoRedor && bloco.bombasPerBloc == 0) {
            abreAoRedor(bloco);
        }
        verificarVitoria();
    }
}


function abreAoRedor(bloco) {
    bloco.abertoAoRedor = true;
    for (let i = bloco.i - 1; i <= bloco.i + 1; i++) {
        for (let j = bloco.j - 1; j <= bloco.j + 1; j++) {
            if (i !== bloco.i || j !== bloco.j) {
                const blocoAtual = getBloco(i, j);
                if (blocoAtual && !blocoAtual.isBomba) abreBlocos(blocoAtual);
            }
        }
    }
}


function verificarVitoria() {
    const totalBlocos = nBlocsX * nBlocsY;
    const blocosSemBombas = totalBlocos - nBombas;
    if (blocosAbertos === blocosSemBombas) {
        Swal.fire({
            icon: 'success',
            title: 'Parabéns!',
            text: 'Você venceu o jogo! 🎉',
            confirmButtonText: 'Jogar Novamente'
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        })
    }
}


draw();


document.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;


    const i = Math.floor((mouseX / 511) * nBlocsX);
    const j = Math.floor((mouseY / 511) * nBlocsY);


    let bloco = getBloco(i, j);
    abreBlocos(bloco);
    draw();
})


document.addEventListener("contextmenu", e => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;


    const i = Math.floor((mouseX / 511) * nBlocsX);
    const j = Math.floor((mouseY / 511) * nBlocsY);


    let bloco = getBloco(i, j);
    bloco.marcada = !bloco.marcada;
    draw();
})