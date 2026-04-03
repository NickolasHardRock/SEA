import  { create, deletar, findAll, findIndex, update } from '../models/UsuarioModel.js';


export const listarUsuarios = async (req,res) =>{
    try{
        const usuarios = await findAll();
        res.json(usuarios);
    }catch(error){
        console.log("O problema esta aqui");
        res.status(500).json({mensagem:'Erro ao buscar usuarios ' + error.message});
    }
}

export const procurarUsuario = async(req,res) =>{
    try{
        const id =  Number(req.params.id);
        const usuario = await findIndex(id);
        res.json(usuario);
    }catch(error){
        console.log("O problema esta aqui");
        res.status(500).json({mensagem:'Erro ao buscar este usuario ' + error.message});
    }
}

export const inserirUsuario = async(req,res) =>{
    try{
        const {nome,email,perfil,senha} = req.body;
        
        const novoUsuario = await create(nome,email,perfil,senha);
        
        
        return res.status(201).json(novoUsuario)
    }catch(error){
        return res.status(500).json({mensagem:'Erro ao criar este usuario ' + error.message});
    }
}

export const atualizarUsuario = async(req,res) =>{
    try{
      const id = Number(req.params.id); 
      const {nome,email,perfil,senha} = req.body;

      const updateUsuario = await update(nome,email,perfil,senha,id);
      res.json(updateUsuario);
    }catch(error){
        res.status(500).json({mensagem:'Erro ao atualizar este usuario' + error.message});
    }
}

export const deleteUsuario = async (req,res) =>{
    try{
        const id = Number(req.params.id);
        const deletarUsuario = await deletar(id);
        res.json(deletarUsuario)
    }catch(error){
        res.status(500).json({mensagem:'Erro ao deletar este usuario' + error.message});
    }
    
    
    
}
