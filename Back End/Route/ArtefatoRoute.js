const express = require('express');
const multer = require('multer');
const router = express.Router();
const ArtefatoControle= require('../Controle/ArtefatoControle');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/listar',ArtefatoControle.listarArtefatos);
router.get('/listar/:id',ArtefatoControle.buscarID);
router.post('/inserir',ArtefatoControle.inserirArtefato);
router.put('/alterar/:id',ArtefatoControle.alterarArtefato);
router.delete('/excluir/:id',ArtefatoControle.excluirArtefato);


router.post('/upload', upload.single('imagem'), ArtefatoControle.uploadImagem);

module.exports = router;