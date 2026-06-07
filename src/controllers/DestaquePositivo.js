import * as DestaquePositivo from '../models/DestaquePositivoModel.js';

export const listarDestaquePositivos = async (req, res) => {
  try {
    const destaquePositivos = await DestaquePositivo.findAll();
    return res.status(200).json(destaquePositivos);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar destaque positivos ' + error.message });
  }
};

export const procurarDestaquePositivo = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const destaquePositivo = await DestaquePositivo.findIndex(id);
    if (!destaquePositivo || destaquePositivo.length === 0) {
      return res.status(404).json({ mensagem: 'Destaque positivo não encontrado' });
    }
    return res.status(200).json(destaquePositivo[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar este destaque positivo ' + error.message });
  }
};

export const inserirDestaquePositivo = async (req, res) => {
  try {
    const { datahora, descricao, registrado, aluno_id } = req.body;
    const novoDestaquePositivo = await DestaquePositivo.create(datahora, descricao, registrado, aluno_id);
    return res.status(201).json(novoDestaquePositivo);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao criar este destaque positivo ' + error.message });
  }
};

export const atualizarDestaquePositivo = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { datahora, descricao, registrado, aluno_id } = req.body;
    const destaquePositivo = await DestaquePositivo.findIndex(id);
    if (!destaquePositivo || destaquePositivo.length === 0) {
      return res.status(404).json({ mensagem: 'Destaque positivo não encontrado' });
    }
    const destaqueAtualizado = await DestaquePositivo.update(id, datahora, descricao, registrado, aluno_id);
    return res.status(200).json(destaqueAtualizado);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao atualizar este destaque positivo ' + error.message });
  }
};

export const deleteDestaquePositivo = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const destaquePositivo = await DestaquePositivo.findIndex(id);
    if (!destaquePositivo || destaquePositivo.length === 0) {
      return res.status(404).json({ mensagem: 'Destaque positivo não encontrado' });
    }
    await DestaquePositivo.deletar(id);
    return res.status(200).json({ mensagem: 'Destaque positivo deletado com sucesso' });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao deletar este destaque positivo ' + error.message });
  }
};
