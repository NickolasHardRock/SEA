import express from "express";
import conectaNaDatabase  from './config/dbConnect.js'

const conexao = await conectaNaDatabase();

conexao.on("error",(erro) => {
  console.error("Erro de conexão",erro);
})

conexao.once("open", () => {
  console.log("Conexao com o banco feita com sucesso");
})


// (async () => {
//   try {
//     const conn = await conectaNaDatabase();
//     console.log("Conectado ao MongoDB:", conn.name);
//   } catch (err) {
//     console.error("Erro ao conectar:", err.message);
//   }
// })();


const app = express();

app.use(express.json()); // Middleware

const livros = [
    {
        id:1,
        titulo: "O Senhor dos Anéis"
    },
    {
        id:2,
        titulo: "O Hobbit"
    }
]

function buscaLivro(id){
  return livros.findIndex(livros => {
    return livros.id === Number(id);
  })
}

app.get("/",(req,res) => {
    res.status(200).send("Curso de Node.js");
});

app.get("/livros",(req,res) =>{
  res.status(200).json(livros);
});

app.get("/livros/:id",(req,res) => {
  const index = buscaLivro(req.params.id);
  res.status(200).json(livros[index]);
});

app.post("/livros",(req,res) => {
  livros.push(req.body);
  res.status(201).send("Livro cadastrado com sucesso"); // 201, que é o código de status HTTP para registro criado.
});

app.put("/livros/:id",(req,res) => {
  const index = buscaLivro(req.params.id);
  livros[index].titulo = req.body.titulo;
  res.status(200).json(livros);
});

app.delete("/livros/:id",(req,res) => {
  const index = buscaLivro(req.params.id);
  livros.splice(index,1);
  res.status(200).send("Livro deletado");
});



export default app;
