let jogadores = [
    {
        nome: "João Gabriel",
        nota: 6.5,
        posicao: "Atacante",
        secundarias: ["Zagueiro"],
        tipo: "Mensalista"
    },
    {
        nome: "Pedro",
        nota: 7.5,
        posicao: "Atacante",
        secundarias: ["Meia"],
        tipo: "Mensalista"
    },
    {
        nome: "Fred",
        nota: 8.5,
        posicao: "Atacante",
        secundarias: [],
        tipo: "Mensalista"
    },
    {
        nome: "Etienne",
        nota: 7.5,
        posicao: "Zagueiro",
        secundarias: [],
        tipo: "Mensalista"
    },
    {
        nome: "Antonio",
        nota: 6,
        posicao: "Zagueiro",
        secundarias: [],
        tipo: "Mensalista"
    },
    {
        nome: "Samuel",
        nota: 5,
        posicao: "Zagueiro",
        secundarias: [],
        tipo: "Mensalista"
    },
    {
        nome: "Lucas",
        nota: 9,
        posicao: "Meia",
        secundarias: ["Atacante"],
        tipo: "Mensalista"
    },
    {
        nome: "Cadu",
        nota: 6,
        posicao: "Zagueiro",
        secundarias: [],
        tipo: "Mensalista"
    },
    {
        nome: "Matheus Santana",
        nota: 5,
        posicao: "Zagueiro",
        secundarias: [],
        tipo: "Mensalista"
    },
    {
        nome: "Jon",
        nota: 9,
        posicao: "Meia",
        secundarias: ["Zagueiro"],
        tipo: "Mensalista"
    },
    {
        nome: "Ruan",
        nota: 6.5,
        posicao: "Meia",
        secundarias: ["Zagueiro"],
        tipo: "Mensalista"
    },
    {
        nome: "Luiz Felipe",
        nota: 7.5,
        posicao: "Meia",
        secundarias: ["Zagueiro"],
        tipo: "Mensalista"
    },
    {
        nome: "Caíque",
        nota: 8,
        posicao: "Meia",
        secundarias: ["Atacante", "Zagueiro"],
        tipo: "Mensalista"
    },
    {
        nome: "Fabio",
        nota: 6,
        posicao: "Zagueiro",
        secundarias: ["Meia"],
        tipo: "Mensalista"
    },
    {
        nome: "Tiago",
        nota: 6,
        posicao: "Zagueiro",
        secundarias: ["Atacante"],
        tipo: "Mensalista"
    }
];

function salvarJogadores() {

    localStorage.setItem(
        "jogadoresPelada",
        JSON.stringify(jogadores)
    );
}

function carregarJogadores() {

    const jogadoresSalvos =
        localStorage.getItem(
            "jogadoresPelada"
        );

    if (jogadoresSalvos) {

        jogadores =
            JSON.parse(jogadoresSalvos);

    }
}

const listaJogadores = document.getElementById("lista-jogadores");

function mostrarJogadores() {

    listaJogadores.innerHTML = "";

    const mensalistas =
        jogadores.filter(
            jogador =>
                jogador.tipo === "Mensalista"
        );

    const diaristas =
        jogadores.filter(
            jogador =>
                jogador.tipo === "Diarista"
        );

    criarGrupoJogadores(
        "Mensalistas",
        mensalistas
    );

    if (diaristas.length > 0) {

        criarGrupoJogadores(
            "Diaristas",
            diaristas
        );
    }
}

function criarGrupoJogadores(
    titulo,
    grupo
) {

    const tituloElemento =
        document.createElement("h2");

    tituloElemento.textContent = titulo;

    listaJogadores.appendChild(
        tituloElemento
    );

    grupo.forEach(jogador => {

        const indice =
            jogadores.indexOf(jogador);

        const elemento =
            document.createElement("div");

        elemento.className = "jogador";

        elemento.innerHTML = `
            <input
                type="checkbox"
                id="jogador-${indice}"
                value="${indice}"
            >

            <label for="jogador-${indice}">

                <strong>
                    ${jogador.nome}
                </strong>

                <br>

                Nota ${jogador.nota}
                • ${jogador.posicao}
                ${
                    jogador.secundarias.length > 0
                        ? ` → ${jogador.secundarias.join(" / ")}`
                        : ""
                }

            </label>
        `;

        listaJogadores.appendChild(
            elemento
        );
    });
}

carregarJogadores();
mostrarJogadores();

const botaoSortear = document.getElementById("botao-sortear");
const resultado = document.getElementById("resultado");
const botaoAdicionarJogador =
    document.getElementById(
        "botao-adicionar-jogador"
    );

const formularioJogador =
    document.getElementById(
        "formulario-jogador"
    );

botaoAdicionarJogador.addEventListener(
    "click",
    () => {

        const estaAberto =
            formularioJogador.style.display === "block";

        formularioJogador.style.display =
            estaAberto ? "none" : "block";

    }
);
const botaoSalvarJogador =
    document.getElementById(
        "salvar-jogador"
    );

botaoSalvarJogador.addEventListener(
    "click",
    () => {

        const nome =
            document
                .getElementById("novo-nome")
                .value
                .trim();

        const tipo =
            document
                .getElementById("novo-tipo")
                .value;

        const nota =
            Number(
                document
                    .getElementById("nova-nota")
                    .value
            );

        const posicao =
            document
                .getElementById("nova-posicao")
                .value;

        const checkboxes =
            document.querySelectorAll(
                ".secundaria-checkbox:checked"
            );

        const secundarias = [];

        checkboxes.forEach(checkbox => {
            secundarias.push(checkbox.value);
        });
        
        const secundariasFiltradas =
            secundarias.filter(
                secundaria => secundaria !== posicao
            );
        
        const novoJogador = {
            nome,
            nota,
            posicao,
            secundarias: secundariasFiltradas,
            tipo
        };

        jogadores.push(novoJogador);

        salvarJogadores();

        mostrarJogadores();

        limparFormularioJogador();

        formularioJogador.style.display = "none";

    }
);

function limparFormularioJogador() {

    document.getElementById(
        "novo-nome"
    ).value = "";

    document.getElementById(
        "nova-nota"
    ).value = "5";

    document.getElementById(
        "nova-posicao"
    ).value = "Zagueiro";

    document
        .querySelectorAll(
            ".secundaria-checkbox"
        )
        .forEach(checkbox => {
            checkbox.checked = false;
        });
}

botaoSortear.addEventListener("click", () => {

    cacheFormacoes.clear();

    const selecionados = document.querySelectorAll(
        '#lista-jogadores input[type="checkbox"]:checked'
    );

    const presentes = [];

    selecionados.forEach(checkbox => {
        const indice = Number(checkbox.value);
        presentes.push(jogadores[indice]);
    });

    if (presentes.length < 10) {

        alert(
            `Faltam ${10 - presentes.length} jogadores para começar a pelada.`
        );

        return;
    }

    if (presentes.length === 15) {

        const solucao =
            gerarTresTimesEquilibrados(presentes);

        mostrarTresTimes(
            solucao.time1,
            solucao.time2,
            solucao.time3
        );

    } else {

    const solucao =
        gerarDoisTimesComReservas(presentes);

    mostrarDoisTimesComReservas(
        solucao.time1,
        solucao.time2,
        solucao.fora
    );

}

});

function embaralhar(lista) {

    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] =
            [copia[j], copia[i]];
    }

    return copia;
}

function somaNotas(time) {
    return time.reduce((total, jogador) => total + jogador.nota, 0);
}

function gerarCombinacoes(lista, tamanho) {
    const resultado = [];

    function combinar(inicio, atual) {

        if (atual.length === tamanho) {
            resultado.push([...atual]);
            return;
        }

        for (let i = inicio; i < lista.length; i++) {
            atual.push(lista[i]);
            combinar(i + 1, atual);
            atual.pop();
        }
    }

    combinar(0, []);

    return resultado;
}

const formacoesIdeais = [

    [
        "Zagueiro",
        "Zagueiro",
        "Meia",
        "Atacante",
        "Atacante"
    ],

    [
        "Zagueiro",
        "Zagueiro",
        "Meia",
        "Meia-atacante",
        "Atacante"
    ]

];

function custoPosicao(jogador, posicaoNecessaria) {

    // Posição principal
    if (jogador.posicao === posicaoNecessaria) {
        return 0;
    }

    // Posição secundária
    if (
        jogador.secundarias.includes(
            posicaoNecessaria
        )
    ) {
        return 1;
    }

    // Fora das posições habituais
    return 4;
}

function gerarPermutacoes(lista) {

    if (lista.length <= 1) {
        return [lista];
    }

    const resultado = [];

    lista.forEach((item, indice) => {

        const restantes = [
            ...lista.slice(0, indice),
            ...lista.slice(indice + 1)
        ];

        const permutacoesRestantes =
            gerarPermutacoes(restantes);

        permutacoesRestantes.forEach(permutacao => {

            resultado.push([
                item,
                ...permutacao
            ]);

        });

    });

    return resultado;
}

const cacheFormacoes = new Map();

function criarChaveTime(time) {

    return time
        .map(jogador => jogador.nome)
        .sort()
        .join("|");
}

function avaliarFormacao(time) {

    const chave = criarChaveTime(time);

    // Se já calculamos esse time antes,
    // não calculamos novamente
    if (cacheFormacoes.has(chave)) {
        return cacheFormacoes.get(chave);
    }

    const permutacoes =
        gerarPermutacoes(time);

    let menorPenalidade = Infinity;
    let melhorFormacao = null;

    formacoesIdeais.forEach(formacao => {

        permutacoes.forEach(ordemJogadores => {

            let penalidade = 0;

            for (let i = 0; i < 5; i++) {

                penalidade += custoPosicao(
                    ordemJogadores[i],
                    formacao[i]
                );

            }

            if (penalidade < menorPenalidade) {

                menorPenalidade = penalidade;

                melhorFormacao = {
                    jogadores: ordemJogadores,
                    posicoes: formacao
                };
            }

        });

    });

    const resultado = {
        penalidade: menorPenalidade,
        formacao: melhorFormacao
    };

    // Guarda para reutilizar
    cacheFormacoes.set(
        chave,
        resultado
    );

    return resultado;
}

function gerarDoisTimesEquilibrados(presentes) {

    const combinacoes = gerarCombinacoes(presentes, 5);

    const solucoes = [];

    combinacoes.forEach(time1 => {

        const time2 = presentes.filter(
            jogador => !time1.includes(jogador)
        );

        if (time2.length !== 5) {
            return;
        }

        const notaTime1 = somaNotas(time1);
        const notaTime2 = somaNotas(time2);

        const diferenca = Math.abs(
            notaTime1 - notaTime2
        );
        const formacaoTime1 =
            avaliarFormacao(time1);
        const formacaoTime2 =
            avaliarFormacao(time2);
        const penalidadeTatica =
            formacaoTime1.penalidade +
            formacaoTime2.penalidade;
        

        solucoes.push({
            time1,
            time2,
            notaTime1,
            notaTime2,
            diferenca,
            penalidadeTatica
        });

    });

    // Ordena da menor diferença para a maior
    solucoes.sort((a, b) => {

    // Primeiro: equilíbrio técnico
    if (a.diferenca !== b.diferenca) {
        return a.diferenca - b.diferenca;
    }

    // Segundo: equilíbrio tático
    return (
        a.penalidadeTatica -
        b.penalidadeTatica
    );

    });

    // Seleciona as 10 melhores
    const melhores = solucoes.slice(0, 10);

    // Escolhe aleatoriamente uma das 10
    const indiceAleatorio = Math.floor(
        Math.random() * melhores.length
    );

    return melhores[indiceAleatorio];
}

function gerarDoisTimesComReservas(presentes) {

   const mensalistas =
        embaralhar(
            presentes.filter(
                jogador =>
                    jogador.tipo ===
                    "Mensalista"
            )
        );
    
    const diaristas =
        embaralhar(
            presentes.filter(
                jogador =>
                    jogador.tipo ===
                    "Diarista"
            )
        );
    
    let jogadoresEmCampo = [];
    
    if (mensalistas.length >= 10) {
    
        jogadoresEmCampo =
            mensalistas.slice(0, 10);
    
    } else {
    
        jogadoresEmCampo = [
            ...mensalistas,
            ...diaristas.slice(
                0,
                10 - mensalistas.length
            )
        ];
    }
    
    const fora =
        presentes.filter(
            jogador =>
                !jogadoresEmCampo.includes(
                    jogador
                )
        );

    // Agora buscamos todas as divisões possíveis
    // dos 10 jogadores que começarão em campo
    const combinacoes =
        gerarCombinacoes(jogadoresEmCampo, 5);

    const solucoes = [];

    combinacoes.forEach(time1 => {

        const time2 =
            jogadoresEmCampo.filter(
                jogador => !time1.includes(jogador)
            );

        if (time2.length !== 5) {
            return;
        }

        const notaTime1 = somaNotas(time1);
        const notaTime2 = somaNotas(time2);

        const diferenca = Math.abs(
            notaTime1 - notaTime2
        );
        const formacaoTime1 =
            avaliarFormacao(time1);

        const formacaoTime2 =
            avaliarFormacao(time2);

        const penalidadeTatica =
            formacaoTime1.penalidade +
            formacaoTime2.penalidade;

        solucoes.push({
            time1,
            time2,
            fora,
            notaTime1,
            notaTime2,
            diferenca,  
            penalidadeTatica
        });

    });

    // Ordena as divisões dos 10 jogadores
    // pela diferença entre os times
    solucoes.sort((a, b) => {

    if (a.diferenca !== b.diferenca) {
        return a.diferenca - b.diferenca;
    }

    return (
        a.penalidadeTatica -
        b.penalidadeTatica
    );

});

    // Pega as 10 divisões mais equilibradas
    const melhores =
        solucoes.slice(0, 10);

    // Sorteia uma delas
    const indiceAleatorio =
        Math.floor(
            Math.random() * melhores.length
        );

    return melhores[indiceAleatorio];
}

function compararSolucoes(a, b) {

    // Primeiro: diferença de nota
    if (a.diferenca !== b.diferenca) {
        return a.diferenca - b.diferenca;
    }

    // Depois: qualidade tática
    return (
        a.penalidadeTatica -
        b.penalidadeTatica
    );
}

function adicionarAoTop10(top10, solucao) {

    top10.push(solucao);

    top10.sort(compararSolucoes);

    if (top10.length > 10) {
        top10.pop();
    }
}

function gerarTresTimesEquilibrados(presentes) {

    const melhores = [];

    const combinacoesTime1 =
        gerarCombinacoes(presentes, 5);

    combinacoesTime1.forEach(time1 => {

        const restantes =
            presentes.filter(
                jogador => !time1.includes(jogador)
            );

        const combinacoesTime2 =
            gerarCombinacoes(restantes, 5);

        combinacoesTime2.forEach(time2 => {

            const time3 =
                restantes.filter(
                    jogador => !time2.includes(jogador)
                );

            if (time3.length !== 5) {
                return;
            }

            /*
            Evita analisar a mesma divisão várias vezes.

            Exemplo:
            A / B / C
            B / A / C
            C / B / A

            São os mesmos três times.
            */

            const chave1 = criarChaveTime(time1);
            const chave2 = criarChaveTime(time2);
            const chave3 = criarChaveTime(time3);

            if (
                !(
                    chave1 < chave2 &&
                    chave2 < chave3
                )
            ) {
                return;
            }

            const notaTime1 =
                somaNotas(time1);

            const notaTime2 =
                somaNotas(time2);

            const notaTime3 =
                somaNotas(time3);

            const maiorNota = Math.max(
                notaTime1,
                notaTime2,
                notaTime3
            );

            const menorNota = Math.min(
                notaTime1,
                notaTime2,
                notaTime3
            );

            const diferenca =
                maiorNota - menorNota;

            const formacaoTime1 =
                avaliarFormacao(time1);

            const formacaoTime2 =
                avaliarFormacao(time2);

            const formacaoTime3 =
                avaliarFormacao(time3);

            const penalidadeTatica =
                formacaoTime1.penalidade +
                formacaoTime2.penalidade +
                formacaoTime3.penalidade;

            const solucao = {
                time1,
                time2,
                time3,

                notaTime1,
                notaTime2,
                notaTime3,

                diferenca,
                penalidadeTatica
            };

            adicionarAoTop10(
                melhores,
                solucao
            );

        });

    });

    const indiceAleatorio =
        Math.floor(
            Math.random() *
            melhores.length
        );

    return melhores[indiceAleatorio];
}

function mostrarTimes(time1, time2) {

    resultado.innerHTML = `
        <div class="time">

            <h2>Time 1</h2>

            ${time1.map(jogador => `
                <p>
                    ${jogador.nome}
                    — ${jogador.nota}
                    — ${jogador.posicao}
                </p>
            `).join("")}

        </div>

        <div class="time">

            <h2>Time 2</h2>

            ${time2.map(jogador => `
                <p>
                    ${jogador.nome}
                    — ${jogador.nota}
                    — ${jogador.posicao}
                </p>
            `).join("")}

        </div>
    `;
}

function criarListaTime(time) {

    return time.map(jogador => `

        <p>
            <strong>${jogador.nome}</strong>
            — ${jogador.nota.toFixed(1)}
            — ${jogador.posicao}
        </p>

    `).join("");
}

function mostrarTresTimes(time1, time2, time3) {

    const notaTime1 = somaNotas(time1);
    const notaTime2 = somaNotas(time2);
    const notaTime3 = somaNotas(time3);

    const maiorNota = Math.max(
        notaTime1,
        notaTime2,
        notaTime3
    );

    const menorNota = Math.min(
        notaTime1,
        notaTime2,
        notaTime3
    );

    const diferenca =
        maiorNota - menorNota;

    resultado.innerHTML = `

        <div class="time">

            <h2>
                Time 1 — ${notaTime1.toFixed(1)}
            </h2>

            ${criarListaTime(time1)}

        </div>

        <div class="time">

            <h2>
                Time 2 — ${notaTime2.toFixed(1)}
            </h2>

            ${criarListaTime(time2)}

        </div>

        <div class="time">

            <h2>
                Time 3 — ${notaTime3.toFixed(1)}
            </h2>

            ${criarListaTime(time3)}

        </div>

        <div class="time">

            <strong>
                Diferença máxima entre os times:
                ${diferenca.toFixed(1)}
            </strong>

        </div>
    `;
}

function mostrarDoisTimesComReservas(
    time1,
    time2,
    fora
) {

    const notaTime1 = somaNotas(time1);
    const notaTime2 = somaNotas(time2);

    const diferenca = Math.abs(
        notaTime1 - notaTime2
    );

    resultado.innerHTML = `

        <div class="time">

            <h2>
                Time 1 — ${notaTime1.toFixed(1)}
            </h2>

            ${criarListaTime(time1)}

        </div>

        <div class="time">

            <h2>
                Time 2 — ${notaTime2.toFixed(1)}
            </h2>

            ${criarListaTime(time2)}

        </div>

        ${
            fora.length > 0
                ? `
                    <div class="time">

                        <h2>Fora inicialmente</h2>

                        ${criarListaTime(fora)}

                    </div>
                `
                : ""
        }

        <div class="time">

            <strong>
                Diferença entre os times:
                ${diferenca.toFixed(1)}
            </strong>

        </div>
    `;
}
