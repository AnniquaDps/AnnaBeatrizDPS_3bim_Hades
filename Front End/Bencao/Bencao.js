const URL_ROTA = 'http://localhost:3001';
const silhueta = '../../public/hades imagens/silhueta.png';

let bencao = null;
let oQueEstaFazendo = "";

bloquearAtributos(true)
window.onload = comecar()

// --------------------- FUNÇÕES ROTA ---------------------

async function listarBencaos() {

    try {

        let resposta = await fetch(`${URL_ROTA}/bencao/listar/`, {
            method: 'GET'
        });

        let dados = await resposta.json();

        if (dados.sucesso) {
            let lista = document.getElementById("RespostaListar");
            lista.innerHTML = "";
            dados.bencao.forEach(function (bencao) {
            const item = document.createElement("div");
            item.classList.add("bencao-item");
            item.innerHTML = `
                <img src="../../public/${bencao.imagem}" class="imagem-bencao">
                <div class="dados-bencao">
                    <p><strong>ID:</strong> ${bencao.id_bencao}</p>
                    <p><strong>Nome:</strong> ${bencao.nome}</p>
                    <p><strong>Deus:</strong> ${bencao.nome_deus}</p>
                    <p><strong>Efeito:</strong> ${bencao.efeito}</p>    
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
        const resposta = await fetch(`${URL_ROTA}/bencao/listar/${id}`);
        const dados = await resposta.json();
        return dados.sucesso ? dados.bencao : null;
    } catch {
        return null;
    }
}

async function carregarDeuses() {
    try {
        const resposta = await fetch(`${URL_ROTA}/bencao/listarDeuses`, {
            method: 'GET'
        });
        const dados = await resposta.json();

        const selectDeus = document.getElementById("selectId_deus");
        selectDeus.innerHTML = "";

        if (dados.sucesso) {
            dados.deus.forEach(function (deus) {
                const option = document.createElement("option");
                option.value = deus.id_deus;
                option.textContent = deus.nome_deus;
                selectDeus.appendChild(option);
            });
        } else {
            selectDeus.innerHTML = `<option value="">Erro ao carregar deuses</option>`;
        }
    } catch (error) {
        console.error("Erro ao carregar deuses:", error);
        document.getElementById("selectId_deus").innerHTML = `<option value="">Erro ao carregar deuses</option>`;
    }
}

// --------------------- FUNÇÕES ROTA ---------------------

// --------------------- IMAGEM ---------------------

function acionarUpload() {
    console.log("oQueEstaFazendo:", oQueEstaFazendo);
    if(oQueEstaFazendo !== 'inserindo' && oQueEstaFazendo !== 'alterando') {
        mostrarAviso("Para alterar a imagem, primeiro salve os dados da bencao.");
        return;
    }
    document.getElementById("inputImagem").click();
}

function previewImagem() {
    const inputFiles = document.getElementById("inputImagem").files;
    if (inputFiles.length > 0) {
        const url = URL.createObjectURL(inputFiles[0]);
        document.getElementById("img_bencao").src = url;
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
        const response = await fetch(`${URL_ROTA}/bencao/upload`, {
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

function carregarImagem(bencao) {

    const imgBencao = document.getElementById("img_bencao");

    if (!bencao) {
        imgBencao.src = silhueta;
        return;
    }

    const urlImagem =  `${URL_ROTA}/${bencao.imagem}?${new Date().getTime()}`
    console.log("urlImagem:", urlImagem);

    imgBencao.src = urlImagem;

    imgBencao.onerror = function () {
        imgBencao.src = silhueta;
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
    let id = parseInt(document.getElementById("id_bencao").value);
    let nome = document.getElementById("nome_bencao").value;
    let efeito = document.getElementById("efeito_bencao").value;
    let id_deus = document.getElementById("selectId_deus").value;

    const inputFiles = document.getElementById("inputImagem").files;
    let imagem = `/hades imagens/Bencao/${inputFiles.length > 0 ? inputFiles[0].name.split('.')[0] + '.webp' : '../silhueta.png'}`;

    const dados = {
        id,
        nome,
        efeito,
        imagem,
        id_deus
    };

    try {
        if (oQueEstaFazendo === 'inserindo') {

            await fetch(`${URL_ROTA}/bencao/inserir`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            await salvarImagem(id);
            mostrarAviso("bencao inserido com sucesso!");

        } else if (oQueEstaFazendo === 'alterando') {
            await fetch(`${URL_ROTA}/bencao/alterar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            await salvarImagem(id);
            mostrarAviso("bencao alterado com sucesso!");
        } else if (oQueEstaFazendo === 'excluindo') {
            await fetch(`${URL_ROTA}/bencao/excluir/${id}`, {
                method: 'DELETE'
            });
            carregarImagem(null);
            mostrarAviso("bencao excluído com sucesso!");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        document.getElementById("id_bencao").value = "";
        listarBencaos();
    } catch (erro) {
        console.error("Erro ao salvar bencao:", erro);
        mostrarAviso("Erro ao salvar bencao.");
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
    const id = parseInt(document.getElementById('id_bencao').value);
    if (isNaN(id) || !Number.isInteger(Number(id)) || id === "") {
        mostrarAviso("Precisa ser um número inteiro");
        return;
    }

    bencao = await procurePorID(id);
    oQueEstaFazendo = '';

    if (bencao) {
        mostrarDadosbencao(bencao);
        carregarImagem(bencao);
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
    document.getElementById("id_bencao").readOnly = !soLeitura;
    document.getElementById("nome_bencao").readOnly = soLeitura;
    document.getElementById("efeito_bencao").readOnly = soLeitura;
    document.getElementById("selectId_deus").disabled = soLeitura;
}

function limparAtributos() {
    bencao = null;
    oQueEstaFazendo = '';
    document.getElementById("nome_bencao").value = "";
    document.getElementById("efeito_bencao").value = "";
    document.getElementById("inputImagem").value = "";
    document.getElementById("selectId_deus").value = "";
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

async function comecar() {
    await listarBencaos();
    carregarImagem(null);
    await carregarDeuses();
}

function mostrarDadosbencao(bencao) {
    document.getElementById("id_bencao").value = bencao.id_bencao;
    document.getElementById("nome_bencao").value = bencao.nome;
    document.getElementById("efeito_bencao").value = bencao.efeito;
    document.getElementById("selectId_deus").value = bencao.id_deus;
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
