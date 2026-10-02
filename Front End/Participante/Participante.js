const URL_ROTA = 'http://localhost:3001';

let participante = null;
let oQueEstaFazendo = "";

bloquearAtributos(true);

window.onload = comecar;


// --------------------- FUNÇÕES ROTA ---------------------

async function listarParticipante() {

    try {

        let resposta = await fetch(`${URL_ROTA}/participante/listar/`, {
            method: 'GET'
        });

        let dados = await resposta.json();

        console.log(dados);

        if (dados.sucesso) {

            let lista = document.getElementById("RespostaListar");

            lista.innerHTML = "";

            dados.participante.forEach(function (participante) {

                const item = document.createElement("div");

                item.classList.add("participante-item");

                item.innerHTML = `
                    <div class="participante">

                        <div class="participante-info">
                            ${participante.id_participante}
                            -
                            ${participante.nome}
                            -
                            ${participante.nome_personagem}
                        </div>

                        <div class="participante-botoes">

                            <button
                                class="btn-excluir"
                                onclick="excluirParticipante(${participante.id_participante})"
                                title="Excluir participante"
                            >
                                🗑
                            </button>

                        </div>

                    </div>
                `;

                lista.appendChild(item);

            });

        } else {

            document.getElementById("RespostaListar").innerHTML =
                `
                <div class="RespostaErrada">
                    Vixi, deu problema! ${dados.mensagem}
                </div>
                `;
        }

    } catch (error) {

        console.error("Erro:", error);

        document.getElementById("RespostaListar").innerHTML =
            `
            <div class="RespostaErrada">
                Vixi, deu problema no servidor!
            </div>
            `;
    }
}


async function procurePorID(id) {

    try {

        const resposta = await fetch(
            `${URL_ROTA}/participante/buscar/${id}`
        );

        const dados = await resposta.json();

        return dados.sucesso ? dados.participante : null;

    } catch {

        return null;
    }
}


async function carregarPersonagens() {

    try {

        const resposta = await fetch(
            `${URL_ROTA}/participante/listarPersonagem`,
            {
                method: 'GET'
            }
        );

        const dados = await resposta.json();

        const selectPersonagem =
            document.getElementById("selectId_personagem");

        selectPersonagem.innerHTML = "";

        if (dados.sucesso) {

            dados.personagem.forEach(function (personagem) {

                const option = document.createElement("option");

                option.value = personagem.id_personagem;
                option.textContent = personagem.nome;

                selectPersonagem.appendChild(option);

            });

        } else {

            selectPersonagem.innerHTML =
                `<option value="">Erro ao carregar personagens</option>`;
        }

    } catch (error) {

        console.error("Erro ao carregar personagens:", error);

        document.getElementById("selectId_personagem").innerHTML =
            `<option value="">Erro ao carregar personagens</option>`;
    }
}


// --------------------- BOTÕES ---------------------

function alterar() {

    bloquearAtributos(false);

    oQueEstaFazendo = 'alterando';

    visibilidadeDosBotoes(
        'none',
        'none',
        'none',
        'inline'
    );

    mostrarAviso(
        "Alterando, clique em Salvar para confirmar ou Cancelar para desistir."
    );
}


function inserir() {

    bloquearAtributos(false);

    oQueEstaFazendo = 'inserindo';

    visibilidadeDosBotoes(
        'none',
        'none',
        'none',
        'inline'
    );

    mostrarAviso(
        "Inserindo, clique em Salvar para confirmar ou Cancelar para desistir."
    );
}


async function salvar() {

    let id = parseInt(
        document.getElementById("id_participante").value
    );

    let nome =
        document.getElementById("nome_participante").value;

    let id_personagem =
        document.getElementById("selectId_personagem").value;


    const dados = {
        id,
        nome,
        id_personagem
    };


    try {

        // -------- INSERIR --------

        if (oQueEstaFazendo === 'inserindo') {

            const resposta = await fetch(
                `${URL_ROTA}/participante/inserir`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(dados)
                }
            );

            const resultado = await resposta.json();

            console.log(resultado);

            mostrarAviso(
                "Participante inserido com sucesso!"
            );
        }


        // -------- ALTERAR --------

        else if (oQueEstaFazendo === 'alterando') {

            const resposta = await fetch(
                `${URL_ROTA}/participante/alterar/${id}`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(dados)
                }
            );

            const resultado = await resposta.json();

            console.log(resultado);

            mostrarAviso(
                "Participante alterado com sucesso!"
            );
        }


        visibilidadeDosBotoes(
            'inline',
            'none',
            'none',
            'none'
        );

        limparAtributos();

        document.getElementById("id_participante").value = "";

        listarParticipante();


    } catch (erro) {

        console.error(
            "Erro ao salvar participante:",
            erro
        );

        mostrarAviso(
            "Erro ao salvar participante."
        );
    }
}


// --------------------- EXCLUIR ---------------------

async function excluirParticipante(id) {

    // 1. Confirma com o usuário

    const confirmar = confirm(
        "Deseja realmente excluir este participante?"
    );

    if (!confirmar) {
        return;
    }


    // 2. Faz o DELETE

    try {

        console.log(
            "Excluindo participante de ID:",
            id
        );


        const resposta = await fetch(
            `${URL_ROTA}/participante/excluir/${id}`,
            {
                method: 'DELETE'
            }
        );


        // 3. Pega a resposta do backend

        const dados = await resposta.json();

        console.log("Resposta do servidor:", dados);


        // 4. Verifica se deu certo

        if (dados.sucesso) {

            mostrarAviso(
                "Participante excluído com sucesso!"
            );

            // 5. Atualiza a lista

            await listarParticipante();

        } else {

            mostrarAviso(
                `Não foi possível excluir: ${dados.mensagem}`
            );
        }


    } catch (erro) {

        console.error(
            "Erro ao excluir participante:",
            erro
        );

        mostrarAviso(
            "Vixi, deu problema ao excluir o participante!"
        );
    }
}


// --------------------- PROCURAR ---------------------

async function procure() {

    const id = parseInt(
        document.getElementById('id_participante').value
    );


    if (
        isNaN(id) ||
        !Number.isInteger(id) ||
        id <= 0
    ) {

        mostrarAviso(
            "Precisa ser um número inteiro"
        );

        return;
    }


    participante = await procurePorID(id);

    oQueEstaFazendo = '';


    if (participante) {

        mostrarDadosparticipante(participante);

        visibilidadeDosBotoes(
            'inline',
            'none',
            'inline',
            'none'
        );

        mostrarAviso(
            "Achou no banco, pode alterar ou excluir"
        );

    } else {

        limparAtributos();

        visibilidadeDosBotoes(
            'inline',
            'inline',
            'none',
            'none'
        );

        mostrarAviso(
            "Não achou no banco, pode inserir"
        );
    }
}


// --------------------- CANCELAR ---------------------

function cancelar() {

    bloquearAtributos(true);

    oQueEstaFazendo = '';

    visibilidadeDosBotoes(
        'inline',
        'none',
        'none',
        'none'
    );

    mostrarAviso(
        "Operação cancelada."
    );

    limparAtributos();
}


// --------------------- FUNÇÕES EXTRAS ---------------------

function bloquearAtributos(soLeitura) {

    document.getElementById("id_participante").readOnly =
        !soLeitura;

    document.getElementById("nome_participante").readOnly =
        soLeitura;

    document.getElementById("selectId_personagem").disabled =
        soLeitura;
}


function limparAtributos() {

    participante = null;

    oQueEstaFazendo = '';

    document.getElementById(
        "nome_participante"
    ).value = "";

    document.getElementById(
        "selectId_personagem"
    ).value = "";

    bloquearAtributos(true);
}


function visibilidadeDosBotoes(
    btP,
    btI,
    btA,
    btS
) {

    document.getElementById("btProcure").style.display =
        btP;

    document.getElementById("btInserir").style.display =
        btI;

    document.getElementById("btAlterar").style.display =
        btA;

    document.getElementById("btSalvar").style.display =
        btS;

    document.getElementById("btCancelar").style.display =
        btS;
}


function mostrarAviso(mensagem) {

    const popup =
        document.getElementById("popupAviso");

    const texto =
        document.getElementById("mensagemAviso");

    texto.textContent = mensagem;

    popup.style.display = "block";
}


async function comecar() {

    await listarParticipante();

    await carregarPersonagens();
}


function mostrarDadosparticipante(participante) {

    document.getElementById(
        "id_participante"
    ).value =
        participante.id_participante;

    document.getElementById(
        "nome_participante"
    ).value =
        participante.nome;

    document.getElementById(
        "selectId_personagem"
    ).value =
        participante.id_personagem;
}


// --------------------- DESIGN ---------------------

const botoes =
    document.querySelectorAll(
        'input[type="button"]'
    );


botoes.forEach(function (botao) {

    botao.addEventListener("click", function () {

        botoes.forEach(function (outroBotao) {

            outroBotao.classList.remove("ligado");

        });

        botao.classList.add("ligado");

    });

});


document.getElementById(
    "fecharAviso"
).addEventListener(
    "click",
    function () {

        document.getElementById(
            "popupAviso"
        ).style.display = "none";

    }
);