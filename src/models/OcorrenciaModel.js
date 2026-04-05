import pool from "../config/dbConnect.js";

export const findAll = async() =>{
    const sql = `
    SELECT
    id_ocorrencia,
    datahora,
    tipo_ocorrencia,
    descricao,
    acao_tomada,
    registrado_por,
    aluno_id,
    gravidade_id
    FROM ocorrencia
    `;
    try{
        const result = await pool.query(sql);
        return result.rows;
    }catch (error){
        console.error('Erro ao buscar Ocorrencias',error);
        throw error;
    }


}

export const findIndex = async (id) => {
    const sql = `
    SELECT
    id_ocorrencia,
    datahora,
    tipo_ocorrencia,
    descricao,
    acao_tomada,
    registrado_por,
    aluno_id,
    gravidade_id
    FROM ocorrencia
    WHERE id_ocorrencia = $1
    `;
    try{
        const result = await pool.query(sql,[id]);
        return result.rows;
    }catch(error){
        console.error(error);
        throw error;
    }
}

export const create = async (dataHora,tipoOcorrencia,descricao,acaoTomada,registroPor,alunoId,gravidadeId) =>{
    const sql = `
    INSERT INTO ocorrencia 
    (
        datahora,
        tipo_ocorrencia,
        descricao,
        acao_tomada,
        registrado_por,
        aluno_id,
        gravidade_id
    )
    VALUES
    (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
    )
        `;

    try{
        const result = await pool.query (sql, [dataHora,tipoOcorrencia,descricao,acaoTomada,registroPor,alunoId,gravidadeId]);
        return result.rows;
    }catch(error){
        console.error(error);
        throw error;
    }
}

export const update = async (id,tipoOcorrencia,descricao,acaoTomada) =>{
     const sql = ` 
    UPDATE ocorrencia 
    SET  
        tipo_ocorrencia = $1,
        descricao = $2,
        acao_tomada = $3,
    WHERE id_ocorrencia = $4
    `;

    try {
        const result = await pool.query(sql, [tipoOcorrencia,descricao,acaoTomada,id]);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deletar = async(id) =>{
    const sql = `
    DELETE FROM ocorrencia
    WHERE id_ocorrencia = $1
    `;
    try{
        const result = await pool.query(sql,[id]);
        return result.rows;
    }catch(error){
        console.error(error);
        throw error;
    }
}