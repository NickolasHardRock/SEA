import express from 'express';

import {listarUsuarios, procurarUsuario, inserirUsuario, atualizarUsuario, deleteUsuario} from '../controllers/UsuarioController.js'
import pool from '../config/dbConnect.js';

const router = express.Router();

router.get('/',listarUsuarios)

router.get ('/id/:id',procurarUsuario)

router.post ('/NovoUsuario',inserirUsuario)

router.put ('/AtualizarUsuario',atualizarUsuario)

router.delete ('/DeletarUsuario',deleteUsuario)

router.get('/ping', async (req,res) => {
    try{
        const result = await pool.query('SELECT NOW()');
        res.json({conectado: true, hora: result.rows[0].now});
    }catch(error){
        res.status(500).json({conectado:false,error: error.message});
    }
})

export default router;