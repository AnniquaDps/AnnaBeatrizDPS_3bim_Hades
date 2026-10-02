const { query } = require('../database');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

exports.listarBencaos = async (req, res) => {
    try {
        const resposta = await query('SELECT B.id_bencao, B.nome, B.efeito, B.imagem, D.nome_deus FROM BENCAO B, DEUS D WHERE B.id_deus = D.id_deus ORDER BY id_bencao;');
        res.json({sucesso:true, bencao: resposta.rows});
    } catch (erro) {
        console.error('Erro ao listar benefícios:', erro);
        res.status(500).json({ sucesso: false});
    }
};

exports.listarDeuses = async (req, res) => {
    try {
        const resposta = await query('SELECT id_deus, nome_deus FROM DEUS ORDER BY id_deus;');   
        res.json({ sucesso: true, deus: resposta.rows });
    } catch (erro) {
        console.error('Erro ao listar deuses:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar deuses.' });
    }
};


exports.buscarID = async function(req, res) {
    try {
        let id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID inválido.'
            });
        }
        const resposta = await query('SELECT B.id_bencao, B.nome, B.efeito, B.imagem, D.id_deus, D.nome_deus FROM BENCAO B, DEUS D WHERE B.id_deus = D.id_deus AND B.id_bencao = $1', [id]);
        if (resposta.rows.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Benção não encontrada.'
            });
        }
        return res.json({
            sucesso: true,
            bencao: resposta.rows[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar benção.'
        });
    }
};

exports.uploadImagem = async (req, res) => {
    try {
        // const id = parseInt(req.params.id);
        // if (isNaN(id)) {
        //     return res.status(400).json({ sucesso: false, mensagem: 'ID inválido.' });
        // }
        if (!req.file) {
            return res.status(400).json({ sucesso: false, mensagem: 'Nenhum arquivo enviado.' });
        }
        const pastaImagens = path.join(__dirname, '../../public/hades imagens/Bencao');
        if (!fs.existsSync(pastaImagens)) {
            fs.mkdirSync(pastaImagens, { recursive: true });
        }
        const caminhoImagem = path.join(pastaImagens, `${req.file.originalname.split('.')[0]}.webp`);
        await sharp(req.file.buffer)
            .resize(300, 300, {
                fit: sharp.fit.cover,
                position: sharp.strategy.entropy
            })
            .toFormat('webp')
            .toFile(caminhoImagem);
        res.json({ sucesso: true, mensagem: 'Imagem enviada com sucesso.' });
    } catch (erro) {
        console.error('Erro ao enviar imagem:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao enviar imagem.' });
    }
};

exports.inserirBencao = async (req, res) => {
    try {
        const { id, nome, efeito, imagem, id_deus } = req.body;
        await query('INSERT INTO BENCAO (id_bencao, nome, efeito, imagem, id_deus) VALUES ($1, $2, $3, $4, $5)', [id, nome, efeito, imagem, id_deus]);
        res.json({ sucesso: true });
    } catch (erro) {
        console.error('Erro ao inserir benção:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao inserir benção.' });
    }
}

exports.alterarBencao = async (req, res) => {
    try {
        const { id, nome, efeito, id_deus, imagem } = req.body;
        await query('UPDATE BENCAO SET nome = $1, efeito = $2, imagem = $3, id_deus = $4 WHERE id_bencao = $5', [nome, efeito, imagem, id_deus, id]);
        res.json({ sucesso: true });
    } catch (erro) {
        console.error('Erro ao alterar benção:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao alterar benção.' });
    }
}

exports.excluirBencao = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await query('DELETE FROM BENCAO WHERE id_bencao = $1', [id]);
        res.json({ sucesso: true });
    } catch (erro) {
        console.error('Erro ao excluir benção:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao excluir benção.' });
    }
};

