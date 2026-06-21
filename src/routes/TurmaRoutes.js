import { Router } from "express";
import TurmaController from "../controllers/TurmaController.js";

const routes = new Router();

// Rota para listar todas as turmas
routes.get('/', TurmaController.index);

// Rota para buscar uma turma específica
routes.get('/:id', TurmaController.show);

// Rota para criar uma nova turma
routes.post('/', TurmaController.store);

// Rota para atualizar uma turma existente
routes.put('/:id', TurmaController.update);

// Rota para deletar uma turma
routes.delete('/:id', TurmaController.delete);

export default routes;