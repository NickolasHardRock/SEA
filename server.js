//import http from "http";


import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import UsuariosRoutes from './src/routes/UsuarioRoutes.js';





console.log(process.env.DB_USER);

const PORT = 3000;

app.listen(PORT,() =>{
    console.log("Servidor escutando 3000");
});

app.use('/api/usuario',UsuariosRoutes);

app.use('/api/usuario/ping',UsuariosRoutes);

