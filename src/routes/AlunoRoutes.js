import express from 'express';
import {listarAlunos,procurarAluno,inserirAluno,atualizarAluno,deleteAluno} from '../controllers/AlunoController.js';

const router = express.Router();

router.get('/',listarAlunos);
router.get('/:id',procurarAluno);
router.post('/',inserirAluno);
router.put('/:id',atualizarAluno);
router.delete('/:id',deleteAluno);

export default router;