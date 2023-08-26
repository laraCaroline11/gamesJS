const celulas = document.querySelectorAll(".celula");
let checagemDeTurno = true;
const jogadorX = "X";
const jogadorO = "O";
const conbinacoes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


document.addEventListener("click", (event) => {
    if (event.target.matches(".celula")) {
        jogar(event.target.id);
    }
})


function jogar(id) {
    const celula = document.getElementById(id);
    turno = checagemDeTurno ? jogadorX : jogadorO;
    celula.textContent = turno;
    celula.classList.add(turno);


    checarvencedor(turno);


}


function checarvencedor(turno) {
    const vencedor = conbinacoes.some((comb) => {
        return comb.every((index) => {
            return celulas[index].classList.contains(turno);
        })
    });


    if (vencedor) {
        encerraJogo(turno);
    } else if (checarEmpate()) {
        encerraJogo();
    } else {
        checagemDeTurno = !checagemDeTurno;
    }
}


function checarEmpate() {
    let x = 0;
    let o = 0;


    for (index in celulas) {
        if (!isNaN(index)) {
            if (celulas[index].classList.contains(jogadorX)) {
                x++;
            }
            if (celulas[index].classList.contains(jogadorO)) {
                o++;
            }
        }
    }
}


function encerraJogo(vencedor = null) {
    const telaEscura = document.getElementById("telaEscura");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    let mensagem = null;


    telaEscura.style.display = "block";
    telaEscura.appendChild(h2);
    telaEscura.appendChild(h3);


    if (vencedor) {
        h2.innerHTML = `O Player <span>${vencedor}</span> Venceu!`;
    } else {
        h2.innerHTML = "Empatou";
    }
}