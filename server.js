import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import UsuariosRoutes from './src/routes/UsuarioRoutes.js';
import AlunosRoutes from './src/routes/AlunoRoutes.js';
import DestaquePositivoRoutes from './src/routes/DestaquePositivo.js';
import OcorrenciaRoutes from './src/routes/OcorrenciaRoutes.js';
dotenv.config();

const app = express();

app.use(express.json(),cors());

const PORT = 3000;


app.use('/api/usuario',UsuariosRoutes);

app.use('/api/aluno', AlunosRoutes);

app.use('/api/destaquePositivo', DestaquePositivoRoutes);

app.use('/api/ocorrencia', OcorrenciaRoutes);


app.listen(PORT,() =>{
    console.log("Servidor escutando 3000");
});