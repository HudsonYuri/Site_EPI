// Importando as dependências
const express = require('express'); // Framework para criar servidores
const mongoose = require('mongoose'); // Biblioteca para interagir com MongoDB
const bodyParser = require('body-parser'); // Middleware para processar dados de formulários
const cors = require('cors'); // Middleware para permitir requisições de diferentes origens

// Inicializando o aplicativo Express
const app = express();
const port = 3000; // Definindo a porta que o servidor irá escutar

// Middleware
app.use(cors()); // Habilita CORS
app.use(bodyParser.json()); // Permite que o servidor interprete JSON no corpo da requisição

// Conectar ao MongoDB
mongoose.connect('mongodb+srv://hudson:1BYkB43Ldnxqowln@epi.168wx.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Definir o modelo de funcionário
const funcionarioSchema = new mongoose.Schema({
    nome: String,
    telefone: String,
    cpf: { type: String, unique: true },
    funcao: String,
    endereco: String,
});

const Funcionario = mongoose.model('Funcionario', funcionarioSchema); // Cria um modelo com base no schema

// Rota para adicionar funcionário
app.post('/funcionario', async (req, res) => {
    const funcionario = new Funcionario(req.body); // Cria uma nova instância do modelo com os dados da requisição
    try {
        await funcionario.save(); // Salva o funcionário no banco de dados
        res.status(201).send('Funcionário cadastrado com sucesso!'); // Retorna uma resposta de sucesso
    } catch (error) {
        res.status(400).send('Erro ao cadastrar funcionário: ' + error.message); // Retorna um erro, se houver
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`); // Mensagem de confirmação
});
