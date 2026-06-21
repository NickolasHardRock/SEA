import { Turma } from '../models/associations.js';

class TurmaController {
  // Listar todas as turmas
  async index(req, res) {
    try {
      const turmas = await Turma.findAll();
      return res.json(turmas);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar turmas', details: error.message });
    }
  }

  // Buscar uma turma por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const turma = await Turma.findByPk(id);
      
      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada' });
      }
      
      return res.json(turma);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar turma', details: error.message });
    }
  }

  // Criar uma nova turma
  async store(req, res) {
    try {
      const { nome } = req.body;
      
      if (!nome) {
        return res.status(400).json({ error: 'O nome da turma é obrigatório' });
      }

      const novaTurma = await Turma.create({ nome });
      return res.status(201).json(novaTurma);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar turma', details: error.message });
    }
  }

  // Atualizar uma turma
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      const turma = await Turma.findByPk(id);
      
      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada' });
      }

      await turma.update({ nome });
      return res.json(turma);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar turma', details: error.message });
    }
  }

  // Deletar uma turma
  async delete(req, res) {
    try {
      const { id } = req.params;
      const turma = await Turma.findByPk(id);

      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada' });
      }

      await turma.destroy();
      return res.json({ message: 'Turma removida com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao remover turma', details: error.message });
    }
  }
}

export default new TurmaController();