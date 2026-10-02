const express = require('express');
const multer = require('multer');
const router = express.Router();
const armaControle= require('../Controle/ArmaControle');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/listar',armaControle.listarArma);
router.get('/listar/:id',armaControle.buscarID);
router.post('/inserir',armaControle.inserirArma);
router.put('/alterar/:id',armaControle.alterarArma);
router.delete('/excluir/:id',armaControle.excluirArma);


router.post('/upload/:id', upload.single('imagem'), armaControle.uploadImagem);

module.exports = router;