import db from '../config/dbConnect.js';

const { Aluno } = db;

export const listarAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    return res.status(200).json(alunos);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar os alunos ' + error.message });
  }
};

export const procurarAluno = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return res.status(404).json({ mensagem: 'Aluno não encontrado' });
    }
    return res.status(200).json(aluno);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar este aluno ' + error.message });
  }
};

export const inserirAluno = async (req, res) => {
  try {
    const { matricula, turma, usuario_id } = req.body;
    const novoAluno = await Aluno.create({
      matricula,
      turma,
      usuario_id,
    });
    return res.status(201).json(novoAluno);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao criar este aluno ' + error.message });
  }
};

export const atualizarAluno = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { matricula, turma } = req.body;
    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return res.status(404).json({ mensagem: 'Aluno não encontrado' });
    }
    await aluno.update({
      matricula,
      turma,
    });
    return res.status(200).json(aluno);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao atualizar este aluno ' + error.message });
  }
};

export const deleteAluno = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return res.status(404).json({ mensagem: 'Aluno não encontrado' });
    }
    await aluno.destroy();
    return res.status(200).json({ mensagem: 'Aluno deletado com sucesso' });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao deletar este aluno ' + error.message });
  }
};
