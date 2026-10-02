const express = require('express');
const router = express.Router();
const ParticipanteControle= require('../Controle/ParticipanteControle');

router.get('/listar',ParticipanteControle.listarParticipante);
router.get('/buscar/:id',ParticipanteControle.buscarID);
router.post('/inserir',ParticipanteControle.inserirParticipante);
router.put('/alterar/:id',ParticipanteControle.alterarParticipante);
router.delete('/excluir/:id',ParticipanteControle.excluirParticipante);
router.get('/listarPersonagem', ParticipanteControle.listarPersonagem);

module.exports = router;