import express from 'express';
import {listarOcorrencia,procurarOcorrencia,inserirOcorrencia,atualizarOcorrencia,deleteOcorrencia} from '../controllers/OcorrenciaControllerSimples.js';

const router = express.Router();

router.get('/',listarOcorrencia);
router.get('/:id',procurarOcorrencia);
router.post('/',inserirOcorrencia);
router.put('/:id',atualizarOcorrencia);
router.delete('/:id',deleteOcorrencia);

export default router;