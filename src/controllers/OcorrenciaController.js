import db from '../config/dbConnect.js';

const { Ocorrencia } = db;

export const listarOcorrencia = async (req, res) => {
  try {
    const ocorrencias = await Ocorrencia.findAll();
    return res.status(200).json(ocorrencias);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar as ocorrencias ' + error.message });
  }
};

export const procurarOcorrencia = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const ocorrencia = await Ocorrencia.findByPk(id);
    if (!ocorrencia) {
      return res.status(404).json({ mensagem: 'Ocorrência não encontrada' });
    }
    return res.status(200).json(ocorrencia);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar esta ocorrencia ' + error.message });
  }
};

export const inserirOcorrencia = async (req, res) => {
  try {
    const { datahora, tipo_ocorrencia, descricao, acao_tomada, registrado_por, aluno_id, gravidade_id } = req.body;
    const novaOcorrencia = await Ocorrencia.create({
      datahora,
      tipo_ocorrencia,
      descricao,
      acao_tomada,
      registrado_por,
      aluno_id,
      gravidade_id,
    });
    return res.status(201).json(novaOcorrencia);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao criar esta ocorrencia ' + error.message });
  }
};

export const atualizarOcorrencia = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { tipo_ocorrencia, descricao, acao_tomada } = req.body;
    const ocorrencia = await Ocorrencia.findByPk(id);
    if (!ocorrencia) {
      return res.status(404).json({ mensagem: 'Ocorrência não encontrada' });
    }
    await ocorrencia.update({
      tipo_ocorrencia,
      descricao,
      acao_tomada,
    });
    return res.status(200).json(ocorrencia);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao atualizar esta ocorrencia ' + error.message });
  }
};

export const deleteOcorrencia = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const ocorrencia = await Ocorrencia.findByPk(id);
    if (!ocorrencia) {
      return res.status(404).json({ mensagem: 'Ocorrência não encontrada' });
    }
    await ocorrencia.destroy();
    return res.status(200).json({ mensagem: 'Ocorrência deletada com sucesso' });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao deletar esta ocorrencia ' + error.message });
  }
};
