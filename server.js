//import http from "http";


import express from 'express';
import dotenv from 'dotenv';
import UsuariosRoutes from './src/routes/UsuarioRoutes.js';
dotenv.config();

const app = express();

app.use(express.json());

const PORT = 3000;




app.use('/api/usuario',UsuariosRoutes);

app.listen(PORT,() =>{
    console.log("Servidor escutando 3000");
});