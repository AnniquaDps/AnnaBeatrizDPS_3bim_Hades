const { query } = require('../database');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

exports.listarArtefatos = async (req, res) => {
    try {
        const resposta = await query('SELECT * FROM ARTEFATO ORDER BY id_artefato;');
        res.json({sucesso:true, artefato: resposta.rows});
    } catch (erro) {
        console.error('Erro ao listar artefatos:', erro);
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
        const resposta = await query('SELECT * FROM ARTEFATO WHERE id_artefato = $1',[id]);
        if (resposta.rows.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Artefato não encontrado.'
            });
        }
        return res.json({
            sucesso: true,
            artefato: resposta.rows[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar artefato.'
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
        const pastaImagens = path.join(__dirname, '../../public/hades imagens/Artefato');
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

exports.inserirArtefato = async (req, res) => {
    try {
        const { id, nome, efeito, imagem } = req.body;
        await query('INSERT INTO ARTEFATO (id_artefato, nome, efeito, imagem) VALUES ($1, $2, $3, $4)', [id, nome, efeito, imagem]);
        res.json({ sucesso: true });
    } catch (erro) {
        console.error('Erro ao inserir artefato:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao inserir artefato.' });
    }
}

exports.alterarArtefato = async (req, res) => {
    try {
        const { id, nome, efeito, imagem } = req.body;
        await query('UPDATE ARTEFATO SET nome = $1, efeito = $2, imagem = $3 WHERE id_artefato = $4', [nome, efeito, imagem, id]);
        res.json({ sucesso: true });
    } catch (erro) {
        console.error('Erro ao alterar artefato:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao alterar artefato.' });
    }
}

exports.excluirArtefato = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await query('DELETE FROM ARTEFATO WHERE id_artefato = $1', [id]);
        res.json({ sucesso: true });
    } catch (erro) {
        console.error('Erro ao excluir artefato:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao excluir artefato.' });
    }
};