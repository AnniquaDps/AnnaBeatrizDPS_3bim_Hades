const { query } = require('../database');

exports.listarParticipante = async (req, res) => {
    try {
        const resposta = await query(`
    SELECT PAR.id_participante, PAR.nome, PER.nome AS nome_personagem FROM PARTICIPANTE PAR LEFT JOIN PERSONAGEM PER ON PAR.id_personagem = PER.id_personagem ORDER BY PAR.id_participante
`);
console.log(resposta.rows)
        res.json({ sucesso: true, participante: resposta.rows });
    } catch (erro) {
        console.error('Erro ao listar participantes:', erro);
        res.status(500).json({ sucesso: false });
    }
};

exports.listarPersonagem = async (req, res) => {
    try {
        const resposta = await query('SELECT P.id_personagem, P.nome FROM PERSONAGEM P LEFT JOIN PARTICIPANTE PAR ON P.id_personagem = PAR.id_personagem WHERE PAR.id_personagem IS NULL ORDER BY id_personagem;');
        res.json({ sucesso: true, personagem: resposta.rows });
    } catch (erro) {
        console.error('Erro ao listar personagens:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar personagens.' });
    }
};


exports.buscarID = async function (req, res) {
    try {
        let id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID inválido.'
            });
        }
        const resposta = await query('SELECT * FROM PARTICIPANTE WHERE id_participante = $1', [id]);
        if (resposta.rows.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Participante não encontrado.'
            });
        }
        return res.json({
            sucesso: true,
            participante: resposta.rows[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar participante.'
        });
    }
};

exports.inserirParticipante = async (req, res) => {
    try {
        const { id, nome, id_personagem } = req.body;
        await query('INSERT INTO PARTICIPANTE (id_participante, nome, id_personagem) VALUES ($1, $2, $3)', [id, nome, id_personagem]);
        res.json({ sucesso: true });
    } catch (erro) {
        console.error('Erro ao inserir participante:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao inserir participante.' });
    }
}

exports.alterarParticipante = async (req, res) => {
    try {
        const { id, nome, id_personagem } = req.body;

        console.log(id, nome, id_personagem)
        await query('UPDATE PARTICIPANTE SET nome = $2, id_personagem = $3 WHERE id_participante = $1', [id, nome, id_personagem]);

        console.log("Deu certo!")
        res.json({ sucesso: true });
    } catch (erro) {
        console.error('Erro ao alterar participante:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao alterar participante.' });
    }
}

exports.excluirParticipante = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await query('DELETE FROM PARTICIPANTE WHERE id_participante = $1', [id]);
        res.json({ sucesso: true });
    } catch (erro) {
        console.error('Erro ao excluir participante:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao excluir participante.' });
    }
};

