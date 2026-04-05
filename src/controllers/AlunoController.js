import {findAll,findIndex,create,update,deletar} from '../models/AlunoModel.js';

export const listarAlunos = async (req,res) =>{
    try{
        const alunos = await findAll();
        return res.status(201).json(alunos);
    }catch(error){
        return res.status(500).json({mensagem:'Erro ao buscar os alunos ' + error.message});
    }
}

export const procurarAluno = async(req,res) =>{
    try{
        const id =  Number(req.params.id);
        const aluno = await findIndex(id);
        return res.status(201).json(aluno);
    }catch(error){
        return res.status(500).json({mensagem:'Erro ao buscar esta aluno ' + error.message});
    }
}

export const inserirAluno = async(req,res) =>{
    try{
        const {matricula,turma,usuarioId} = req.body;
        const novoAluno = await create(matricula,turma,usuarioId);
        return res.status(201).json(novoAluno)
    }catch(error){
        return res.status(500).json({mensagem:'Erro ao criar este aluno ' + error.message});
    }
}

export const atualizarAluno = async(req,res) =>{
    try{
      const id = Number(req.params.id); 
      const {matricula,turma,usuarioId} = req.body;

      const updateAluno = await update(matricula,turma,usuarioId,id);
      return res.status(201).res.json(updateAluno);
    }catch(error){
        return res.status(500).json({mensagem:'Erro ao atualizar este aluno ' + error.message});
    }
}

export const deleteAluno = async (req,res) =>{
    try{
        const id = Number(req.params.id);
        const deletarAluno = await deletar(id);
        return res.status(201).json(deletarAluno)
    }catch(error){
        return res.status(500).json({mensagem:'Erro ao deletar este aluno' + error.message});
    }
    
    
    
}
