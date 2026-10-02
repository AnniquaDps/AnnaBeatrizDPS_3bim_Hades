const { query } = require('../database');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

exports.listarArma = async (req, res) => {
    try {
        const resposta = await query('SELECT * FROM ARMA ORDER BY id_arma;');
        res.json({sucesso:true, armas: resposta.rows});
    } catch (erro) {
        console.erro('Erro ao listar armas:', erro);
        res.status(500).json({ sucesso: false});
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
        const resposta = await query('SELECT * FROM ARMA WHERE id_arma = $1',[id]);
        if (resposta.rows.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Arma não encontrada.'
            });
        }
        return res.json({
            sucesso: true,
            arma: resposta.rows[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar arma.'
        });
    }
};

exports.uploadImagem = async (req, res) => {
    try{
    const id = parseInt(req.params.id);
    if(!req.file) {
        return res.status(400).json({ sucesso: false, mensagem: 'Nenhum arquivo enviado.' });
    }
    const pastaImagens = path.join(__dirname, '../../public/hades imagens/Arma');
    if (!fs.existsSync(pastaImagens)) {
        fs.mkdirSync(pastaImagens, { recursive: true });
    }
    const caminhoImagem = path.join(pastaImagens, `${req.file.originalname.split('.')[0]}.webp`);
    await sharp(req.file.buffer)
        .resize(300, 300, {
            fit: sharp.fit.cover,
            position: sharp.strategy.entropy})
        .toFormat('webp')
        .toFile(caminhoImagem);
    res.json({ sucesso: true, mensagem: 'Imagem enviada com sucesso.' });
    } catch (erro) {
    console.error('Erro ao enviar imagem:', erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao enviar imagem.' });
    }
};

exports.inserirArma = async (req, res) => {
    try {
        const { id, nome, descricao, imagem } = req.body;
        await query('INSERT INTO ARMA (id_arma, nome, descricao, imagem) VALUES ($1, $2, $3, $4)', [id, nome, descricao, imagem]);
        res.json({ sucesso: true });
    } catch (erro) {
        console.error('Erro ao inserir arma:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao inserir arma.' });
    }
}

exports.alterarArma = async (req, res) => {
    try {
        const { id, nome, descricao, imagem } = req.body;
        await query('UPDATE ARMA SET nome = $1, descricao = $2, imagem = $3 WHERE id_arma = $4', [nome, descricao, imagem, id]);
        res.json({ sucesso: true });
    } catch (erro) {
        console.error('Erro ao alterar arma:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao alterar arma.' });
    }
}

exports.excluirArma = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await query('DELETE FROM ARMA WHERE id_arma = $1', [id]);
        res.json({ sucesso: true });
    } catch (erro) {
        console.error('Erro ao excluir arma:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao excluir arma.' });
    }
};