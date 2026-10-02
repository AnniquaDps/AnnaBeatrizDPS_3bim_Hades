const URL_ROTA = 'http://localhost:3001';
const silhueta = '../../public/hades imagens/silhueta.png';

let arma = null;
let oQueEstaFazendo = "";

bloquearAtributos(true)
window.onload = comecar()

// --------------------- FUNÇÕES ROTA ---------------------

async function listarArmas() {

    try {

        let resposta = await fetch(`${URL_ROTA}/arma/listar/`, {
            method: 'GET'
        });

        let dados = await resposta.json();

        if (dados.sucesso) {
            let lista = document.getElementById("RespostaListar");
            lista.innerHTML = "";
            dados.arma.forEach(function (arma) {
            const item = document.createElement("div");
            item.classList.add("arma-item");
            item.innerHTML = `
                <img src="../../public/${arma.imagem}" class="imagem-arma">
                <div class="dados-arma">
                    <p><strong>ID:</strong> ${arma.id_arma}</p>
                    <p><strong>Nome:</strong> ${arma.nome}</p>
                    <p><strong>Descrição:</strong> ${arma.descricao}</p>    
                </div>`;

            lista.appendChild(item);
            });
        } else {
            document.getElementById("RespostaListar").innerHTML =
                `<div class="RespostaErrada">
                    Vixi, deu problema! ${dados.mensagem}
                </div>`;
        }
    } catch (error) {
        console.error("Erro:", error);
        document.getElementById("RespostaListar").innerHTML =
            `<div class="RespostaErrada">
                Vixi, deu problema no servidor!
            </div>`;
    }
}

async function procurePorID(id) {
    try {
        const resposta = await fetch(`${URL_ROTA}/arma/listar/${id}`);
        const dados = await resposta.json();
        return dados.sucesso ? dados.arma : null;
    } catch {
        return null;
    }
}

// --------------------- FUNÇÕES ROTA ---------------------

// --------------------- IMAGEM ---------------------

function acionarUpload() {
    console.log("oQueEstaFazendo:", oQueEstaFazendo);
    if(oQueEstaFazendo !== 'inserindo' && oQueEstaFazendo !== 'alterando') {
        mostrarAviso("Para alterar a imagem, primeiro salve os dados da arma.");
        return;
    }
    document.getElementById("inputImagem").click();
}

function previewImagem() {
    const inputFiles = document.getElementById("inputImagem").files;
    if (inputFiles.length > 0) {
        const url = URL.createObjectURL(inputFiles[0]);
        document.getElementById("img_arma").src = url;
        mostrarAviso("Imagem carregada, mas ainda não salva no banco. Clique em Salvar para enviar.");
    }
}
async function salvarImagem(id) {
    const inputFiles = document.getElementById("inputImagem").files;
    if (inputFiles.length === 0) {
        return;
    }

    const formData = new FormData();
    formData.append('imagem', inputFiles[0]);

    try {
        const response = await fetch(`${URL_ROTA}/arma/upload/${id}`, {
            method: 'POST',
            body: formData
        });

        const dados = await response.json(); // <- parênteses + await

        if (dados.sucesso) {
            mostrarAviso("Imagem enviada com sucesso.");
        } else {
            mostrarAviso("Erro ao enviar imagem.", dados.mensagem);
        }
    } catch (erro) {
        console.error("Erro ao enviar imagem:", erro);
    }
}

function carregarImagem(arma) {

    const imgArma = document.getElementById("img_arma");

    if (!arma) {
        imgArma.src = silhueta;
        return;
    }

    urlImagem =  `${URL_ROTA}${arma.imagem}?${new Date().getTime()}`
    console.log("urlImagem:", urlImagem);

    imgArma.src = urlImagem;

    imgArma.onerror = function () {
        imgArma.src = silhueta;
    };
}

// --------------------- IMAGEM ---------------------

// --------------------- BOTÕES ---------------------

function alterar() {
    bloquearAtributos(false);
    oQueEstaFazendo = 'alterando';
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    mostrarAviso("Alterando, clique em Salvar para confirmar ou Cancelar para desistir.");
}

function inserir() {
    bloquearAtributos(false);
    oQueEstaFazendo = 'inserindo';
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    mostrarAviso("Inserindo, clique em Salvar para confirmar ou Cancelar para desistir.");
}

async function salvar() {
    let id = parseInt(document.getElementById("id_arma").value);
    let nome = document.getElementById("nome_arma").value;
    let descricao = document.getElementById("descricao_arma").value;

    const inputFiles = document.getElementById("inputImagem").files;
    let imagem = `public/hades imagens/Arma/${inputFiles.length > 0 ? inputFiles[0].name.split('.')[0] + '.webp' : '../silhueta.png'}`;

    const dados = {
        id,
        nome,
        descricao,
        imagem
    };

    try {
        if (oQueEstaFazendo === 'inserindo') {

            await fetch(`${URL_ROTA}/arma/inserir`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            await salvarImagem(id);
            mostrarAviso("Arma inserida com sucesso!");

        } else if (oQueEstaFazendo === 'alterando') {
            await fetch(`${URL_ROTA}/arma/alterar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            await salvarImagem(id);
            mostrarAviso("Arma alterada com sucesso!");
        } else if (oQueEstaFazendo === 'excluindo') {
            await fetch(`${URL_ROTA}/arma/excluir/${id}`, {
                method: 'DELETE'
            });
            carregarImagem(null);
            mostrarAviso("Arma excluída com sucesso!");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        document.getElementById("id_arma").value = "";
        listarArmas();
    } catch (erro) {
        console.error("Erro ao salvar arma:", erro);
        mostrarAviso("Erro ao salvar arma.");
    }
}

function cancelar() {
    bloquearAtributos(true);
    oQueEstaFazendo = '';
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Operação cancelada.");
    carregarImagem(null);
    limparAtributos();
}

function excluir() {
    bloquearAtributos(true);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - Clique em salvar para confirmar a exclusão");
}

async function procure() {
    const id = parseInt(document.getElementById('id_arma').value);
    if (isNaN(id) || !Number.isInteger(Number(id)) || id === "") {
        mostrarAviso("Precisa ser um número inteiro");
        return;
    }

    arma = await procurePorID(id);
    oQueEstaFazendo = '';

    if (arma) {
        mostrarDadosProduto(arma);
        carregarImagem(arma);
        visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
        mostrarAviso("Achou no banco, pode alterar ou excluir");
    } else {
        limparAtributos();
        carregarImagem(null);
        visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
        mostrarAviso("Não achou no banco, pode inserir");
    }
}

// --------------------- BOTÕES ---------------------

// --------------------- FUNÇÕES EXTRAS ---------------------

function bloquearAtributos(soLeitura) {
    document.getElementById("id_arma").readOnly = !soLeitura;
    document.getElementById("nome_arma").readOnly = soLeitura;
    document.getElementById("descricao_arma").readOnly = soLeitura;
}

function limparAtributos() {
    arma = null;
    oQueEstaFazendo = '';
    document.getElementById("nome_arma").value = "";
    document.getElementById("descricao_arma").value = "";
    document.getElementById("inputImagem").value = "";
    bloquearAtributos(true);
}

function visibilidadeDosBotoes(btP, btI, btA, btE, btS) {
    document.getElementById("btProcure").style.display = btP;
    document.getElementById("btInserir").style.display = btI;
    document.getElementById("btAlterar").style.display = btA;
    document.getElementById("btExcluir").style.display = btE;
    document.getElementById("btSalvar").style.display = btS;
    document.getElementById("btCancelar").style.display = btS;
}

function mostrarAviso(mensagem) {
    const popup = document.getElementById("popupAviso");
    const texto = document.getElementById("mensagemAviso");

    texto.textContent = mensagem;

    popup.style.display = "block";
}

function comecar() {
    listarArmas();
    carregarImagem(null);
}

function mostrarDadosProduto(arma) {
    document.getElementById("id_arma").value = arma.id_arma;
    document.getElementById("nome_arma").value = arma.nome;
    document.getElementById("descricao_arma").value = arma.descricao;
}

// --------------------- FUNÇÕES EXTRAS ---------------------

// --------------------- DESIGN ---------------------

const botoes = document.querySelectorAll('input[type="button"]');
botoes.forEach(function (botao) {

    botao.addEventListener("click", function () {

        botoes.forEach(function (outroBotao) {
            outroBotao.classList.remove("ligado");
        });

        botao.classList.add("ligado");

    });

});

document.getElementById("fecharAviso").addEventListener("click", function () {

    document.getElementById("popupAviso").style.display = "none";

});

// --------------------- DESIGN ---------------------
