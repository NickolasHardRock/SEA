import express from 'express';
import {listarDestaquePositivos,procurarDestaquePostivio,inserirDestaquePositivo,atualizarDestaquePositivo,deleteDestaquePositivo} from '../controllers/DestaquePositivo.js';

const router = express.Router();

router.get('/',listarDestaquePositivos);

router.get('/id/:id',procurarDestaquePostivio);

router.post('/NovoDestaque',inserirDestaquePositivo);

router.put('/AtualizarDestaque/:id',atualizarDestaquePositivo);

router.delete('/DeletarDestaque/:id',deleteDestaquePositivo);

export default router;