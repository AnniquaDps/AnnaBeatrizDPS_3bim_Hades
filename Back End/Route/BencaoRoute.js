const express = require('express');
const multer = require('multer');
const router = express.Router();
const BencaoControle= require('../Controle/BencaoControle');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/listar',BencaoControle.listarBencaos);
router.get('/listar/:id',BencaoControle.buscarID);
router.post('/inserir',BencaoControle.inserirBencao);
router.put('/alterar/:id',BencaoControle.alterarBencao);
router.delete('/excluir/:id',BencaoControle.excluirBencao);
router.get('/listarDeuses', BencaoControle.listarDeuses);


router.post('/upload', upload.single('imagem'), BencaoControle.uploadImagem);

module.exports = router;