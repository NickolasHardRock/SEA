import pool from "../config/dbConnect";

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


};
