import express from 'express';
import {listarAlunos,procurarAluno,inserirAluno,atualizarAluno,deleteAluno} from '../controllers/AlunoController.js';
import pool from '../config/dbConnect.js';

const router = express.Router();

router.get('/',listarAlunos)

router.get('/id/:id',procurarAluno)

router.post('/NovoAluno',inserirAluno)

router.put('/AtualizarAluno',atualizarAluno)

router.delete('/DeletarAluno',deleteAluno)

export default router;