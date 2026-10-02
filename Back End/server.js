const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { query } = require('./database');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());
app.use(express.json());

const ArmaRoute = require('./Route/ArmaRoute');
const ArtefatoRoute = require('./Route/ArtefatoRoute');
const BencaoRoute = require('./Route/BencaoRoute');
const ParticipanteRoute = require('./Route/ParticipanteRoute');

console.log("ArmaRoute:", ArmaRoute);
console.log("ArtefatoRoute:", ArtefatoRoute);
console.log("BencaoRoute:", BencaoRoute);
console.log("ParticipanteRoute:", ParticipanteRoute);

app.use('/arma', ArmaRoute)
app.use('/artefato', ArtefatoRoute);
app.use('/bencao', BencaoRoute);
app.use('/participante', ParticipanteRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    console.log(`\n=================================`);
    console.log(`🚀 Servidor executando na porta ${PORT}`);
    
    try {
        await query('SELECT 1');
        console.log(`✅ Banco de Dados conectado com sucesso!`);
    } catch (error) {
        console.error(`❌ FALHA NA CONEXÃO COM O BANCO DE DADOS:`);
        console.error(`   Motivo: ${error.message}`);
        console.error(`👉 Ajuste o arquivo .env com a senha correta do seu PostgreSQL.`);
    }
    console.log(`=================================\n`);
});