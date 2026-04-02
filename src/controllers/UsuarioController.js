import  { findAll } from '../models/UsuarioModel.js';


export const listarUsuarios = async (req,res) =>{
    try{
        const usuarios = await findAll();
        res.json(usuarios);
    }catch(error){
        console.log("O problema esta aqui");
        res.status(500).json({mensagem:'Erro ao buscar usuarios ' + error.message});
    }
}
