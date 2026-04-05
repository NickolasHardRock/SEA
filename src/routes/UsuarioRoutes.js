import express from 'express';
import {listarUsuarios, procurarUsuario, inserirUsuario, atualizarUsuario, deleteUsuario} from '../controllers/UsuarioController.js'


const router = express.Router();

router.get('/',listarUsuarios)

router.get ('/id/:id',procurarUsuario)

router.post ('/NovoUsuario',inserirUsuario)

router.put ('/AtualizarUsuario/:id',atualizarUsuario)

router.delete ('/DeletarUsuario/:id',deleteUsuario)


export default router;