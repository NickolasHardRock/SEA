import  { create, deletar, findAll, findIndex, update } from '../models/DestaquePositivoModel.js';


export const listarDestaquePositivos= async (req,res) =>{
    try{
        const destaquePositivos= await findAll();
        return res.status(201).json(destaquePositivos);
    }catch(error){
        return res.status(500).json({mensagem:'Erro ao buscar destaque positivos ' + error.message});
    }
}

export const procurarDestaquePostivio = async(req,res) =>{
    try{
        const id =  Number(req.params.id);
        const destaquePositivo = await findIndex(id);
        return res.status(201).json(destaquePositivo);
    }catch(error){
        return res.status(500).json({mensagem:'Erro ao buscar este destaque positivo ' + error.message});
    }
}

export const inserirDestaquePositivo = async(req,res) =>{
    try{
        const {dataHora,descricao,registrado,alunoId} = req.body;
        
        const novoDestaquePositivo = await create(dataHora,descricao,registrado,alunoId);

        return res.status(201).json(novoDestaquePositivo)
    }catch(error){
        return res.status(500).json({mensagem:'Erro ao criar este destaque positivo ' + error.message});
    }
}

export const atualizarDestaquePositivo = async(req,res) =>{
    try{
      const id = Number(req.params.id); 
      const {dataHora,descricao,registrado,alunoId} = req.body;

      const updateDestaquePositivo = await update(dataHora,descricao,registrado,alunoId,id);
      return res.status(201).json(updateDestaquePositivo);
    }catch(error){
        return res.status(500).json({mensagem:'Erro ao atualizar este destaque positivo' + error.message});
    }
}

export const deleteDestaquePositivo = async (req,res) =>{
    try{
        const id = Number(req.params.id);
        const deletarDestaquePositivo = await deletar(id);
        return res.status(201).json(deletarDestaquePositivo)
    }catch(error){
        return res.status(500).json({mensagem:'Erro ao deletar este destaque positivo' + error.message});
    }
    
    
    
}
