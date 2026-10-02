const URL_ROTA = 'http://localhost:3001';
const silhueta = '../../public/hades imagens/silhueta.png';

let artefato = null;
let oQueEstaFazendo = "";

bloquearAtributos(true)
window.onload = comecar()

// --------------------- FUNÇÕES ROTA ---------------------

async function listarArtefatos() {

    try {

        let resposta = await fetch(`${URL_ROTA}/artefato/listar/`, {
            method: 'GET'
        });

        let dados = await resposta.json();

        if (dados.sucesso) {
            let lista = document.getElementById("RespostaListar");
            lista.innerHTML = "";
            dados.artefato.forEach(function (artefato) {
            const item = document.createElement("div");
            item.classList.add("artefato-item");
            item.innerHTML = `
                <img src="../../public/${artefato.imagem}" class="imagem-artefato">
                <div class="dados-artefato">
                    <p><strong>ID:</strong> ${artefato.id_artefato}</p>
                    <p><strong>Nome:</strong> ${artefato.nome}</p>
                    <p><strong>Efeito:</strong> ${artefato.efeito}</p>    
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
        const resposta = await fetch(`${URL_ROTA}/artefato/listar/${id}`);
        const dados = await resposta.json();
        return dados.sucesso ? dados.artefato : null;
    } catch {
        return null;
    }
}

// --------------------- FUNÇÕES ROTA ---------------------

// --------------------- IMAGEM ---------------------

function acionarUpload() {
    console.log("oQueEstaFazendo:", oQueEstaFazendo);
    if(oQueEstaFazendo !== 'inserindo' && oQueEstaFazendo !== 'alterando') {
        mostrarAviso("Para alterar a imagem, primeiro salve os dados da artefato.");
        return;
    }
    document.getElementById("inputImagem").click();
}

function previewImagem() {
    const inputFiles = document.getElementById("inputImagem").files;
    if (inputFiles.length > 0) {
        const url = URL.createObjectURL(inputFiles[0]);
        document.getElementById("img_artefato").src = url;
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
        const response = await fetch(`${URL_ROTA}/artefato/upload`, {
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

function carregarImagem(artefato) {

    const imgArtefato = document.getElementById("img_artefato");

    if (!artefato) {
        imgArtefato.src = silhueta;
        return;
    }

    const urlImagem =  `${URL_ROTA}/${artefato.imagem}?${new Date().getTime()}`
    console.log("urlImagem:", urlImagem);

    imgArtefato.src = urlImagem;

    imgArtefato.onerror = function () {
        imgArtefato.src = silhueta;
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
    let id = parseInt(document.getElementById("id_artefato").value);
    let nome = document.getElementById("nome_artefato").value;
    let efeito = document.getElementById("efeito_artefato").value;

    const inputFiles = document.getElementById("inputImagem").files;
    let imagem = `/hades imagens/Artefato/${inputFiles.length > 0 ? inputFiles[0].name.split('.')[0] + '.webp' : '../silhueta.png'}`;

    const dados = {
        id,
        nome,
        efeito,
        imagem
    };

    try {
        if (oQueEstaFazendo === 'inserindo') {

            await fetch(`${URL_ROTA}/artefato/inserir`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            await salvarImagem(id);
            mostrarAviso("Artefato inserido com sucesso!");

        } else if (oQueEstaFazendo === 'alterando') {
            await fetch(`${URL_ROTA}/artefato/alterar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            await salvarImagem(id);
            mostrarAviso("Artefato alterado com sucesso!");
        } else if (oQueEstaFazendo === 'excluindo') {
            await fetch(`${URL_ROTA}/artefato/excluir/${id}`, {
                method: 'DELETE'
            });
            carregarImagem(null);
            mostrarAviso("Artefato excluído com sucesso!");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        document.getElementById("id_artefato").value = "";
        listarArtefatos();
    } catch (erro) {
        console.error("Erro ao salvar artefato:", erro);
        mostrarAviso("Erro ao salvar artefato.");
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
    const id = parseInt(document.getElementById('id_artefato').value);
    if (isNaN(id) || !Number.isInteger(Number(id)) || id === "") {
        mostrarAviso("Precisa ser um número inteiro");
        return;
    }

    artefato = await procurePorID(id);
    oQueEstaFazendo = '';

    if (artefato) {
        mostrarDadosArtefato(artefato);
        carregarImagem(artefato);
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
    document.getElementById("id_artefato").readOnly = !soLeitura;
    document.getElementById("nome_artefato").readOnly = soLeitura;
    document.getElementById("efeito_artefato").readOnly = soLeitura;
}

function limparAtributos() {
    artefato = null;
    oQueEstaFazendo = '';
    document.getElementById("nome_artefato").value = "";
    document.getElementById("efeito_artefato").value = "";
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
    listarArtefatos();
    carregarImagem(null);
}

function mostrarDadosArtefato(artefato) {
    document.getElementById("id_artefato").value = artefato.id_artefato;
    document.getElementById("nome_artefato").value = artefato.nome;
    document.getElementById("efeito_artefato").value = artefato.efeito;
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
