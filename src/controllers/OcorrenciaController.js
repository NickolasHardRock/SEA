import {findAll,findIndex,create,update,deletar} from '../models/OcorrenciaModel.js';

export const listarOcorrencia = async (req,res) =>{
    try{
        const ocorrencias = await findAll();
        return res.status(201).json(ocorrencias);
    }catch(error){
        return res.status(500).json({mensagem:'Erro ao buscar as ocorrencias ' + error.message});
    }
}

export const procurarOcorrencia = async(req,res) =>{
    try{
        const id =  Number(req.params.id);
        const ocorrencia = await findIndex(id);
        return res.status(201).json(ocorrencia);
    }catch(error){
        return res.status(500).json({mensagem:'Erro ao buscar esta ocorrencia ' + error.message});
    }
}

export const inserirOcorrencia = async(req,res) =>{
    try{
        const {dataHora,tipoOcorrencia,descricao,acaoTomada,registradoPor,alunoId,gravidadeId} = req.body;
        const novoOcorrencia = await create(dataHora,tipoOcorrencia,descricao,acaoTomada,registradoPor,alunoId,gravidadeId);
        console.log("Body recebido: ", req.body);
        return res.status(201).json(novoOcorrencia)
        
    }catch(error){
        console.log("Body recebido: ", req.body);
        return res.status(500).json({mensagem:'Erro ao criar esta ocorrencia ' + error.message});
    }
}

export const atualizarOcorrencia = async(req,res) =>{
    try{
      const id = Number(req.params.id); 
      const {dataHora,tipoOcorrencia,descricao,acaoTomada,registradoPor,alunoId,gravidadeId} = req.body;

      const updateOcorrencia = await update(tipoOcorrencia,descricao,acaoTomada,id);
      return res.status(201).json(updateOcorrencia);
    }catch(error){
        res.status(500).json({mensagem:'Erro ao atualizar esta ocorrencia ' + error.message});
    }
}

export const deleteOcorrencia = async (req,res) =>{
    try{
        const id = Number(req.params.id);
        const deletarOcorrencia= await deletar(id);
        return res.status(201).json(deletarOcorrencia)
    }catch(error){
        return res.status(500).json({mensagem:'Erro ao deletar esta ocorrencia' + error.message});
    }
    
    
    
}
