import pool from '../config/dbConnect.js'

export const findAll = async () =>{

    const sql = `
    SELECT 
    id_aluno,
    matricula,
    turma,
    usuario_id
    FROM aluno 
    `;
    try{
        const result = await pool.query(sql);
        return result.rows;
    }catch(error){
        console.error('Erro ao buscar os alunos: ',error);
        throw error;
    }
};

export const findIndex = async  (id) =>{
    const sql = `
    SELECT 
    id_aluno,
    matricula,
    turma,
    usuario_id
    FROM aluno 
    WHERE id_aluno = $1
    `;
    try{
        const result = await pool.query(sql,[id]);
        return result.rows;
    }catch (error){
        console.error(error);
        throw error;
    }
};

export const create = async (matricula,turma,usuario_id) => {
    const sql = `
    INSERT INTO aluno (matricula,turma,usuario_id) VALUES ($1,$2,$3)
    `;

    try{
        const result = await pool.query(sql,[matricula,turma,usuario_id]);
        return result.rows;
    }catch(error){
        console.error(error);
        throw error;
    }
};

export const update = async (matricula,turma,id) => {
    const sql = `
    UPDATE aluno 
    SET
    matricula = $1
    turma = $2
    WHERE id_aluno
    `;
    try{
        const result = await pool.query(sql,[matricula,turma,id]);
        return result.rows;
    }catch(error){
        console.error(error);
        throw error;
    }
};

export const deletar = async(id) => {
    const sql = `
    DELETE FROM aluno
    WHERE id_aluno`;
    try{
        const result = await pool.query(sql,[id]);
        return result.rows;
    }catch(error){
        console.error(error);
        throw error;
    }

}


