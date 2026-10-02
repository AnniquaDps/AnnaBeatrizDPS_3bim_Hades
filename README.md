# 🏛️ Hades — Sistema de RPG

Projeto desenvolvido para a disciplina de **Desenvolvimento Web I (DW1)**, com o objetivo de aplicar os conceitos de **CRUD, banco de dados, Node.js, Express, HTML, CSS e JavaScript** em uma aplicação web inspirada no universo do jogo **Hades**.

A aplicação simula um sistema de RPG no qual existe um **Mestre**, responsável pelo gerenciamento dos elementos da campanha, e **Participantes**, que podem montar suas fichas utilizando personagens, armas, bênçãos e artefatos disponíveis.

---

## 🎮 Sobre o projeto

O sistema foi desenvolvido com uma temática inspirada no jogo **Hades**, utilizando sua estética visual, personagens e elementos do universo do jogo para construir a interface.

A aplicação possui dois principais tipos de acesso:

### 👑 Mestre

O Mestre é responsável pelo gerenciamento dos dados utilizados na campanha.

Por meio do sistema, ele pode realizar operações de CRUD sobre os elementos disponíveis, como:

* Personagens
* Armas
* Bênçãos
* Artefatos
* Participantes

# 🛠️ Tecnologias utilizadas

O projeto foi desenvolvido utilizando:

* **HTML5** — estrutura das páginas
* **CSS3** — estilização e identidade visual
* **JavaScript** — comportamento e interação da aplicação
* **Node.js** — execução do servidor
* **Express** — criação do servidor e gerenciamento das rotas
* **PostgreSQL** — banco de dados
* **Git/GitHub** — versionamento do projeto

Também foram utilizados recursos adicionais para trabalhar com arquivos e imagens no servidor, quando necessários.

---

# 📁 Estrutura do projeto

A estrutura principal do projeto segue a organização utilizada durante as aulas:

```text
HADES/
│
├── BACK/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── ...
│
├── DATABASE/
│   └── CREATE.sql
│
├── FRONT/
│   ├── html/
│   ├── css/
│   ├── js/
│   └── ...
│
├── PUBLIC/
│   └── hades imagens/
│
├── .env
├── package.json
├── package-lock.json
└── README.md
```

> A organização exata das pastas pode variar conforme a versão final do projeto.

---

# 💻 Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

### Node.js

O Node.js é responsável por executar o servidor da aplicação.

Após instalar, verifique no terminal:

```bash
node -v
```

e:

```bash
npm -v
```

### PostgreSQL

O PostgreSQL é utilizado para armazenar os dados da aplicação.

Também é necessário possuir uma ferramenta para acessar o banco, como o **pgAdmin**.

---

# 📥 Instalação

## 1. Clone o repositório

Abra o terminal e execute:

```bash
git clone URL_DO_REPOSITORIO
```

Depois entre na pasta do projeto:

```bash
cd HADES
```

---

## 2. Instale as dependências

Na pasta do projeto, execute:

```bash
npm install
```

Esse comando instala todas as dependências presentes no `package.json`.

---

# 🗄️ Configuração do banco de dados

Antes de iniciar o servidor, é necessário configurar o banco PostgreSQL.

## 1. Criar o banco

Abra o PostgreSQL/pgAdmin e crie um banco de dados para o projeto.

Exemplo:

```text
hades
```

---

## 2. Executar o script SQL

Localize o arquivo:

```text
DATABASE/CREATE.sql
```

Execute seu conteúdo no banco criado.

Esse arquivo é responsável pela criação das tabelas e relacionamentos necessários para o funcionamento do sistema.

---

# 🔐 Configuração do `.env`

Na raiz do projeto, crie um arquivo chamado:

```text
.env
```

Nele devem ser configuradas as informações necessárias para a conexão com o PostgreSQL.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=hades
```

> Os nomes das variáveis devem corresponder aos utilizados no código do projeto.

⚠️ **O arquivo `.env` não deve ser enviado ao GitHub**, pois ele contém informações privadas da conexão com o banco.

Por isso, ele deve estar incluído no `.gitignore`.

---

# ▶️ Executando o projeto

Depois de instalar as dependências e configurar o banco de dados, execute o servidor.

Caso o projeto utilize o arquivo `server.js` como entrada principal:

```bash
node server.js
```

Se o `package.json` possuir um script de inicialização, também pode ser utilizado:

```bash
npm start
```

Após iniciar o servidor, será exibida no terminal a porta utilizada pela aplicação.

Exemplo:

```text
Servidor rodando na porta 3000
```

Nesse caso, abra no navegador:

```text
http://localhost:3000
```

---

# 🧭 Funcionamento da aplicação

Ao acessar o sistema, o usuário encontra a interface temática inspirada na **Casa de Hades**.

A aplicação permite escolher entre os diferentes tipos de utilização do sistema.

## 👑 Área do Mestre

O Mestre possui acesso às funcionalidades administrativas.

A partir dela é possível:

```text
Cadastrar
    ↓
Consultar
    ↓
Editar
    ↓
Excluir
```

Essas operações correspondem ao **CRUD** utilizado no projeto.

---

## ⚔️ Área do Participante

Em andamento

---

# 🧩 CRUD

O projeto utiliza o conceito de **CRUD**:

| Operação   | Significado | Exemplo            |
| ---------- | ----------- | ------------------ |
| **Create** | Criar       | Cadastrar uma arma |
| **Read**   | Ler         | Listar as armas    |
| **Update** | Atualizar   | Alterar uma arma   |
| **Delete** | Excluir     | Remover uma arma   |

Essas operações são utilizadas para manipular os registros armazenados no banco de dados.

---

# 🗃️ Banco de dados

O banco PostgreSQL armazena as informações utilizadas pelo sistema.

Entre os principais elementos trabalhados estão:

* Mestre
* Participante
* Campanha - N/Utilizado
* Ficha - N/utilizado
* Personagem
* Arma
* Bênção
* Artefato

Os relacionamentos entre essas entidades permitem associar os participantes às campanhas e suas respectivas fichas.

---

# 🎨 Interface

A interface foi desenvolvida com uma identidade visual baseada no universo de **Hades**.

Foram utilizados:

* Imagens temáticas
* Tipografia personalizada
* Cores inspiradas no jogo
* Elementos visuais da Casa de Hades
* Pilares decorativos
* Imagens sobrepostas
* Menus e botões personalizados

Também foram utilizadas fontes externas ao sistema por meio de `@font-face`.

Exemplo:

```css
@font-face {
    font-family: "Hades";
    src: url("../../public/hades imagens/hades/HADES.otf")
         format("opentype");
}
```

---

# ⚠️ Problemas comuns

### O servidor não inicia

Verifique se as dependências foram instaladas:

```bash
npm install
```

---

### Erro de conexão com o PostgreSQL

Confira:

* PostgreSQL está funcionando;
* banco de dados foi criado;
* usuário está correto;
* senha está correta;
* porta está correta;
* arquivo `.env` está configurado.

---

### Imagens não aparecem

Verifique se a estrutura de pastas das imagens está correta e se os caminhos utilizados no HTML/CSS correspondem à localização dos arquivos.

---
