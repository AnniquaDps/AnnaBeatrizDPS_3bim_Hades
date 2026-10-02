-- Active: 1790614510608@@127.0.0.1@2710@hades@public
DROP TABLE IF EXISTS MESTRE, CAMPANHA, PERSONAGEM, PARTICIPANTE, ARMA, DEUS, BENCAO, ARTEFATO, FICHA;

CREATE TABLE MESTRE (
    id_mestre SERIAL PRIMARY KEY
);

CREATE TABLE CAMPANHA (
    id_campanha SERIAL PRIMARY KEY,
    nome VARCHAR,
    senha INT,
    id_mestre INT,
	FOREIGN KEY(id_mestre) REFERENCES MESTRE(id_mestre)
);

CREATE TABLE PERSONAGEM (
    id_personagem SERIAL PRIMARY KEY,
    nome VARCHAR,
    imagem VARCHAR,
    descricao VARCHAR
);

CREATE TABLE PARTICIPANTE (
    id_participante SERIAL PRIMARY KEY,
    id_personagem INT,
	nome VARCHAR,
	FOREIGN KEY(id_personagem) REFERENCES PERSONAGEM(id_personagem)
);

CREATE TABLE ARMA (
    id_arma SERIAL PRIMARY KEY,
    nome VARCHAR,
    descricao VARCHAR,
    imagem VARCHAR
);

CREATE TABLE DEUS (
    id_deus SERIAL PRIMARY KEY,
    nome_deus VARCHAR,
    imagem VARCHAR
);

CREATE TABLE BENCAO (
    id_bencao SERIAL PRIMARY KEY,
    nome VARCHAR,
    efeito VARCHAR,
	imagem VARCHAR,
    id_deus INT,
	FOREIGN KEY (id_deus) REFERENCES DEUS(id_deus)
);

CREATE TABLE ARTEFATO (
    id_artefato SERIAL PRIMARY KEY,
    nome VARCHAR,
    efeito VARCHAR,
    imagem VARCHAR
);

CREATE TABLE FICHA (
    id_ficha SERIAL PRIMARY KEY,

    id_artefato INT,
    id_bencao INT,
    id_arma INT,
    id_participante INT,

    FOREIGN KEY (id_artefato) REFERENCES ARTEFATO(id_artefato),
    FOREIGN KEY (id_bencao) REFERENCES BENCAO(id_bencao),
    FOREIGN KEY (id_arma) REFERENCES ARMA(id_arma),
    FOREIGN KEY (id_participante) REFERENCES PARTICIPANTE(id_participante)
);

INSERT INTO PERSONAGEM (nome, imagem, descricao) VALUES
('Zagreus','/hades imagens/Personagem/zagreus.webp','Zagreus é tranquilo e caracterizado por seu bom humor, gentileza e persistência 
incansável. Embora seja amigável, ele também é inquieto, imprudente e teimoso, o que muitas vezes complica seus relacionamentos. Sua 
atitude confiante, sarcasmo e ocasional falta de consciência podem levar a dinâmicas turbulentas, especialmente com aqueles próximos 
a ele. Deixa os outros exaustos'),

('Nix','/hades imagens/Personagem/nix.webp','Nix é a deusa primordial que personifica a noite. Conhecida como mãe da noite ela dá 
conselhos, instruções e analisa o trabalho diário dos Deuses Ctônicos e da equipe'),
('Tânatos','/hades imagens/Personagem/tanatos.webp','Tânatos é a personificação da Morte, filho de Nix e o irmão gêmeo mais velho de 
Hipnos. Como personificação da morte, Tânatos tem muitos deveres que exigem que ele se aventure no reino mortal. Tânatos prioriza um 
trabalho bem feito e gosta de manter um histórico perfeito, mas apesar de sua forte ética de trabalho, isso não o impede de se mover 
nas sombras.'),

('Hipnos','/hades imagens/Personagem/hipnos.webp','Hipnos é a personificação do sono. Ele é um das muitas crianças de Nix e o irmão
gêmeo mais novo de Tânatos. Ele é frequentemente visto dormindo no trabalho.'),
('Megaira','/hades imagens/Personagem/megaira.webp','Megaira é confiante, obstinada e conduz seu trabalho com perfeição. Ela tem um 
ódio especial por quem quebra juramentos e tem alegria em torturá-los por toda a eternidade. Apesar da compostura, seu prazer em 
puni-los é evidente.'),

('Aquiles','/hades imagens/Personagem/aquiles.webp','Um semideus formidável conhecido por seu papel na Guerra de Tróia. Aquiles é 
muito humilde e auto-depreciativo. Não vê motivos para regalar pessoas com histórias de seu passado. Ele odeia cebolas, e a parte 
engraçada é que ele está morto de sério sobre isso. Ele até diz que prefere desaparecer no nada a ser forçado a comer uma cebola 
novamente.'),

('Dusa','/hades imagens/Personagem/dusa.webp','Dusa é a cabeça decepada de uma Górgona que trabalha como empregada sofredora para a 
casa de Hades. Ela parece muito otimista, alegre, extremamente trabalhadora. Dusa é amigável, tímida, brincalhona, uma ótima companhia
e gosta de compartilhar fofocas em seu tempo livre. Ela tem uma paixão dolorosamente óbvia por Zagreus'),

('Orfeu','/hades imagens/Personagem/orfeu.webp','Um músico lendário, infelizmente, a perda de sua esposa e parceira musical Eurídice 
privou Orfeu de qualquer vontade de cantar, encanta e leva às lágrimas quem o escuta. Ninguém canta uma música mais doce e triste do 
que ele.'),

('Zé Caveira','/hades imagens/Personagem/zecaveira.webp','O esqueleto excessivamente animado, continua sendo uma figura misteriosa.
Ele é ferozmente leal e corajoso. Tende a exibir comportamento extremo, sendo altamente entusiasmado, falante e condescendente com 
aqueles que estão ao alcance da voz.');

INSERT INTO ARMA (nome, descricao, imagem) VALUES
('Lâmina estígia','...Stygius, a Lâmina do Submundo, deve ter estado entre as melhores armas já empunhadas, quando estava inteira. 
Na época em que os seis deuses anciãos selaram os Titãs nos recessos mais profundos do Tártaro, essa lâmina evidentemente desempenhou
um papel importante em seu sucesso.','/hades imagens/Arma/espada.webp'),

('Varatha lança eterna','...Deve ter sido uma visão quando o Senhor Hades empunhou Varatha, a Lança Eterna, contra os Titãs, expulsando 
aqueles demônios para as profundezas, junto com a ajuda de seus irmãos e irmãs olímpicos.','/hades imagens/Arma/lanca.webp'),

('Punho duplo','...Qualquer outra arma deve ser segurada na mão, mas Malphon se une completamente ao seu 
portador, envolvendo-o com força e presteza primitivas.',
'/hades imagens/Arma/luva.webp'),

('Escudo do Caos','...O escudo foi estilhaçado, mesmo assim uma efígie em chamas permanece, seu poder ainda intacto
. Um poder selado dentro do semblante de uma entidade monstruosa até mesmo os titãs temiam. Seu poder é incontrolável, e escasso 
funciona como uma maneira de defesa.','/hades imagens/Arma/escudo.webp'),

('Buscador de corações','Buscador de Corações, é certamente o melhor arco já concebido e empunhado uma vez por ninguém menos que a 
Senhora Hera, que estava lado a lado com Zeus.','/hades imagens/Arma/arco.webp'),

('Trilo de adamantio','´‚...O Trilho tem uma forma e função para se adequar aos pesadelos - enquanto 
outras armas dos deuses inspiravam contrapartes mortais, estou aliviado em dizer que o projeto cruel do Trilho ainda não foi 
descoberto em um golpe de inspiração mortal, para conduzir suas guerras.','/hades imagens/Arma/arma.webp');

INSERT INTO DEUS (nome_deus,imagem) VALUES
('Afrodite','/hades imagens/Deuses/afrodite.webp'),
('Ares','/hades imagens/Deuses/ares.webp'),
('Artemis','/hades imagens/Deuses/artemis.webp'),
('Atena','/hades imagens/Deuses/atena.webp'),
('Deméter','/hades imagens/Deuses/demeter.webp'),
('Dionísio','/hades imagens/Deuses/dionisio.webp'),
('Hermes','/hades imagens/Deuses/hermes.webp'),
('Poseidon','/hades imagens/Deuses/poseidon.webp'),
('Zeus','/hades imagens/Deuses/zeus.webp');

INSERT INTO BENCAO (nome, efeito,imagem, id_deus) VALUES 
('Golpe de desilusão','Seu Ataque causa +50% de dano extra e inflige 10 de fraqueza.','/hades imagens/Bencao/XAF.webp',1),
('Florescer de desilusão','Seu ataque especial causa +80% de dado e inflige 10 de fraqueza.','/hades imagens/Bencao/YAF.webp',1),
('Chama da paixão','Seu tiro causa 50 de fraqueza e tem 300 de alcance.','/hades imagens/Bencao/BAF.webp',1),
('Corrida da paixão','Seu arranque causa 15 de dano e 5 de fraqueza.','/hades imagens/Bencao/AAF.webp',1),
('A ajuda de Afrodite','Ao chamar dispara um projétil perseguidor de charme, causa 2500 de dano.','/hades imagens/Bencao/RTAF.webp',1),

('Maldição da agonia','Seu ataque inflinge 50 de condenação.','/hades imagens/Bencao/XAR.webp',2),
('Maldição da dor','Seu ataque especial inflige 60 de condenação.','/hades imagens/Bencao/YAR.webp',2),
('Golpe cortado','Sua Conjuração lança uma Fenda de Lâmina, causa 20 por hit, dura 4s.','/hades imagens/Bencao/BAR.webp',2),
('Investida de lâmina','Ao arrancar cria uma lâmina, causa 10 de dano.','/hades imagens/Bencao/AAR.webp',2),
('A ajuda de Ares','Seu Chamado transforma você em uma Fenda de Lâmina Impenetrável por 5s de duração.','/hades imagens/Bencao/RTAR.webp',2),

('Golpe mortal','Seu ataque causa +15% de chance de CRIT.','/hades imagens/Bencao/XAM.webp',3),
('Investida mortal','Seu especial tem +20% de chance de CRIT.','/hades imagens/Bencao/YAM.webp',3),
('Tiro da verdade','Seu tiro caça inimigos, tem 10% de chace de CRIT.','/hades imagens/Bencao/BAM.webp',3),
('Corredor de caça','Seu arranque causa +50% dano.','/hades imagens/Bencao/AAM.webp','3'),
('A ajuda de Artmemis','Dispara uma flecha perseguidora com +35% de chance de CRIT.','/hades imagens/Bencao/RTAM.webp',3),

('Ataque divino','Seu ataque causa +40% de dano extra e reflete.','/hades imagens/Bencao/XAT.webp',4),
('Florescimento divino','Seu especial causa 60% de dano extra e reflete.','/hades imagens/Bencao/YAT.webp',4),
('Disparo de Falange','Seu tiro reflete e causa 250 de dano.','/hades imagens/Bencao/BAT.webp',4),
('Corrida divina','Seu arranque reflete.','/hades imagens/Bencao/AAT.webp',4),
('A ajuda de Atena','Concede brevemente invulnerabilidade e desvia todos os ataques, por 2s.','/hades imagens/Bencao/RTAT.webp',4),

('Golpe congelante','Seu ataque causa +40% de dano extra e inflige +1 resfriamento.','/hades imagens/Bencao/XDE.webp',5),
('Florescer gélido','Seu especial causa 60% de dano extra e infling +2 resfriamento.','/hades imagens/Bencao/YDE.webp',5),
('Feixe de crital','Dispara um tiro que lança uma névoa que se expande, duração de 5s.','/hades imagens/Bencao/BDE.webp',5),
('Traço Mistral','Seu arranque causa +1 de resfriamento.','/hades imagens/Bencao/ADE.webp',5),
('A ajuda de Demeter','Cria um vórtice de inverno por 5 segundos, causando dano a cada 0,25 segundos e aplicando o efeito de Resfriamento.','/hades imagens/Bencao/RTDE.webp',5),

('Golpe de Bêbado','Seu Ataque causa 4 de Ressaca.','/hades imagens/Bencao/XDI.webp',6),
('Floreio Embriagado','Seu Especial causa 6 de Ressaca.','/hades imagens/Bencao/YDI.webp',6),
('Efeito de Luz Psicodélico','Sua Conjuração causa dano aos inimigos ao seu redor, deixando para trás Névoa Festiva.','/hades imagens/Bencao/BDI.webp',6),
('Corrida Bêbada','Inflinge 1 de ressaca.','/hades imagens/Bencao/ADI.webp',6),
('A ajuda de Dionisio','Seu chamado causa Ressaca aos inimigos ao seu redor por 1,5 segundo.','/hades imagens/Bencao/RTDI.webp',6),

('Ataque rápido','Seu ataque é +10% rápido','/hades imagens/Bencao/XHE.webp',7),
('Rápido desabrochar','Seu especial é +20% rápido','/hades imagens/Bencao/YHE.webp',7),
('Disparo de agitação','Seu tiro é +20% rápido e automático','/hades imagens/Bencao/BHE.webp',7),
('Corrida de hype','Por 1 s após realizar uma Investida, você se torna Reistente e corre 100% mais rápido.','/hades imagens/Bencao/AHE.webp',7),
('Um favorzinho','Ativa o chamado automaticamente','/hades imagens/Bencao/RTHE.webp',7),

('Golpe da Tempestade','Seu ataque causa mais 40% de dano e arremessa os inimigos para longe.','/hades imagens/Bencao/XPO.webp',8),
('Florescimento da Tempestade','Seu Especial causa mais 60% de dano e arremessa os inimigos para longe.','/hades imagens/Bencao/YPO.webp',8),
('Sinalizador de Inundação','Sua Conjuração causa dano aos inimigos ao seu redor e os arremessa para longe, causa 60 de dano.','/hades imagens/Bencao/BPO.webp',8),
('Corrida das Marés','Sua Investida causa dano aos inimigos em uma área e os arremessa para longe, causa 35 de dano.','/hades imagens/Bencao/APO.webp',8),
('A ajuda de Poseidon','Faz você avançar contra os inimigos enquanto permanece Imune por 1,2 segundos.','/hades imagens/Bencao/RTOP.webp',8),

('Relâmpago','Seu Ataque dispara um relâmpago em cadeia ao causar dano a um inimigo.','/hades imagens/Bencao/XZE.webp',9),
('Florescer de raios','Sua Habilidade Especial faz com que um raio atinja inimigos próximos.','/hades imagens/Bencao/YZE.webp',9),
('Bala elétrica','Sua Conjuração é uma rajada de relâmpago em cadeia que salta entre os inimigos.','/hades imagens/Bencao/BZE.webp',9),
('Corrida do trovão','Faz com que um raio atinja inimigos próximos.','/hades imagens/Bencao/AZE.webp',9),
('A ajuda de Zeus','faz com que raios atinjam inimigos próximos repetidamente por 1,5 s.','/hades imagens/Bencao/RTEZ.webp',9);

INSERT INTO ARTEFATO (nome, efeito, imagem) VALUES
('Coleira com Espinhos Antiga','+50 HP','/hades imagens/Artefato/ACE.webp'),
('Braçadeira de Mirmidão','+30% RES','/hades imagens/Artefato/AQU.webp'),
('Xale Preto','+20% DMG','/hades imagens/Artefato/ANI.webp'),
('Borboleta Perfurada','+1 DMG a cada encontro sem sofrer dano','/hades imagens/Artefato/ATH.webp'),
('Ampulheta de Osso','Chance de +1 item no poço por nível','/hades imagens/Artefato/ACA.webp'),
('Bolsinha de Moedas Ctônica','Inicie o nível com +150 Óbolo de Caronte','/hades imagens/Artefato/AHI.webp'),
('Brinco de caveira','+40% DMG quando estiver com 35% ou menos de HP','/hades imagens/Artefato/AME.webp'),
('Lembrança Distante','+30% DMG ao atacar inimigos distantes','/hades imagens/Artefato/AOR.webp'),
('Espanador de Penas de Harpia','Urnas quebradas têm 6% de chance de conter itens de cura.','/hades imagens/Artefato/ADU.webp'),
('Dente da Sorte','Restaure automaticamente 100 de HP quando seu total HP se esgotar. Efeito único.','/hades imagens/Artefato/ASK.webp'),
('Sinete do Trovão','+10% de chance de encontrar Zeus','/hades imagens/Artefato/AZE.webp'),
('Concha','+10% de chance de encontrar Poseidon','/hades imagens/Artefato/APO.webp'),
('Pingente de Coruja','+10% de chance de encontrar Atena','/hades imagens/Artefato/AAT.webp'),
('Rosa Eterna','+10% de chance de encontrar Afrodite','/hades imagens/Artefato/AAF.webp'),
('Frasco cheio de sangue','+10% de chance de encontrar Ares','/hades imagens/Artefato/AAR.webp'),
('Ponta de Flecha de Adamantita','+10% de chance de encontrar Artemis','/hades imagens/Artefato/AAM.webp'),
('Cálice Transbordante','+10% de chance de encontrar Dionisio','/hades imagens/Artefato/ADI.webp'),
('Pluma Cintilante','+10% de chance de encontrar Hermes','/hades imagens/Artefato/AHE.webp'),
('Chifre Congelado','+10% de chance de encontrar Demeter','/hades imagens/Artefato/ADE.webp'),
('Ovo Cósmico','+10% de chance de encontrar Caos','/hades imagens/Artefato/ACA.webp'),
('Grilhão Quebrado','Seus ataques de Ataque, Especial e Conjuração causam 100% de dano quando não estão fortalecidos por uma Bênção.','/hades imagens/Artefato/ACI.webp'),
('Bolota de Árvore Sempre-Verde','No confronto final de cada região do submundo, receba 0 de dano nas primeiras 5 vezes que os inimigos o atingirem.','/hades imagens/Artefato/AEU.webp'),
('Ponta de Lança Quebrada','Após sofrer dano, torna-se imune a dano por 1,5 s. O efeito é renovado após 7 s.','/hades imagens/Artefato/APA.webp'),
('flor de pompom','A cada 4 Encontros, ganhe +1 Nível (uma Bênção aleatória fica mais forte).','/hades imagens/Artefato/APE.webp');
