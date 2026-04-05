import express from 'express';
import {listarOcorrencia,procurarOcorrencia,inserirOcorrencia,atualizarOcorrencia,deleteOcorrencia} from '../controllers/OcorrenciaController.js';

const router = express.Router();

router.get('/',listarOcorrencia);

router.get('/id/:id',procurarOcorrencia);

router.post('/NovaOcorrencia',inserirOcorrencia);

router.put('/AtualizarOcorrencia/:id',atualizarOcorrencia);

router.delete('/DeletarOcorrencia/:id',deleteOcorrencia);

export default router;