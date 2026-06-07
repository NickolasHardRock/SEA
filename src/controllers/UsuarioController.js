import db from '../config/dbConnect.js';

const { Usuario } = db;

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['senha'] },
    });
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar usuarios ' + error.message });
  }
};

export const procurarUsuario = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ['senha'] },
    });
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar este usuario ' + error.message });
  }
};

export const inserirUsuario = async (req, res) => {
  try {
    const { nome, email, perfil, senha } = req.body;
    const novoUsuario = await Usuario.create({
      nome,
      email,
      perfil,
      senha,
    });
    return res.status(201).json(novoUsuario);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao criar este usuario ' + error.message });
  }
};

export const atualizarUsuario = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nome, email, perfil, senha } = req.body;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    await usuario.update({
      nome,
      email,
      perfil,
      senha,
    });
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao atualizar este usuario ' + error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    await usuario.destroy();
    return res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao deletar este usuario ' + error.message });
  }
};
