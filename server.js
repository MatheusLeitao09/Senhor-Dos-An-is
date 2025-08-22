
import express from "express";
import personagens from "./src/data/personagens.js";

const app = express();
const PORT = 3000;


// Rota Principal

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bem-vindo à Terra Média</title>
            <style>
                body {
                    background-color: #0d1a26; /* Cor de fundo escura */
                    color: #e0e7e4;
                    font-family: 'Georgia', serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    text-align: center;
                }

                .container {
                    background-color: rgba(0, 0, 0, 0.7);
                    padding: 40px 60px;
                    border-radius: 15px;
                    border: 2px solid #a67c52;
                    box-shadow: 0 0 30px rgba(166, 124, 82, 0.5);
                    animation: fadeIn 2s ease-in-out;
                }

                h1 {
                    font-size: 3.5em;
                    color: #a67c52;
                    text-shadow: 2px 2px 5px #000;
                    letter-spacing: 2px;
                    animation: pulse 2s infinite;
                }

                p {
                    font-size: 1.5em;
                    color: #d1b490;
                    margin-top: 10px;
                }
                
                /* Animações */
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Bem-vindo ao Mundo da Terra Média!</h1>
                <p>Que o seu caminho seja longo e sem perigos.</p>
            </div>
        </body>
        </html>
    `);
});

// Rota para buscar todos os personagens

app.get("/personagens", (req, res) => {   
    res.json({
        success: true,  
        message: "Todos os personagens da Terra Média!",
        data: personagens,
        total: personagens.length
    });
});

// Criar a rota GET Personagens

// Rota para buscar personagem por id

app.get("/personagens/id/:id", (req, res) => {
    // Pega o ID da URL
    const id = parseInt(req.params.id);
    
    // Busca o personagem pelo ID
    const personagem = personagens.find(b => b.id === id);
    
    // Se encontrou, retorna os dados
    if (personagem) {
        res.json({
            success: true,
            message: `Personagem ${personagem.nome} encontrado! ⚡`,
            data: personagem
        });
    } else {
        // Se não encontrou, retorna erro 404
        res.status(404).json({
            success: false,
            error: "Personagem não encontrado 😕",
            message: `Nenhum personagem com ID ${id} foi encontrado`,
            codigo: "WIZARD_NOT_FOUND"
        });
    }
});

// Buscar personagens por nome 

app.get("/personagens/nome/:nome", (req, res) => {
    const nomePesquisado = req.params.nome.toLowerCase();

    const resultados = personagens.filter(personagem => personagem.nome.toLowerCase().includes(nomePesquisado));

if (resultados.length > 0 ) {
    res.json(resultados);

} else {
    res.status(404).send("Nenhum personagem foi encontrado pelo nome")
}
});

// Buscar personagem pela raça

app.get("/personagens/raca/:raca", (req, res) => {
    const racaPesquisada = req.params.raca.toLowerCase();

    const resultados = personagens.filter(personagem => personagem.raca.toLowerCase().includes(racaPesquisada));

if (resultados.length > 0 ) {
    res.json(resultados);

} else {
    res.status(404).send("Nenhum personagem foi encontrado com essa raça")
}
});

app.get("/personagens/:vivos", (req, res) => {
    const personagensVivos = personagens.filter(personagem => personagem.vivo);
    res.json(personagensVivos)

})
app.listen(3000, () => {
    console.log(`🧙‍♂️ API está no ar na porta 3000! Acesse http://localhost:${PORT}`);
});
