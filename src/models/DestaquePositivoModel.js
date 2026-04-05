
import pool from '../config/dbConnect.js'


export const findAll = async () => {

    const sql = `
    SELECT
    id,
    datahora,
    descricao,
    registrado,
    aluno_id
    FROM destaque_positivo
    `;
    try {
        const result = await pool.query(sql);
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar destaque positivo:', error);
        throw error;
    }
};

export const findIndex = async (id) => {
    const sql = `
    SELECT
    id,
    datahora,
    descricao,
    registrado,
    aluno_id
    FROM destaque_positivo
    WHERE 
    id = $1
    `;

    try {
        const result = await pool.query(sql, [id]);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const create = async (dataHora, descricao, registrado, alunoId) => {
    const sql = `
    INSERT INTO destaque_positivo (datahora,
    descricao,
    registrado,
    aluno_id) VALUES ($1,$2,$3,$4)
`;

    try {
        const result = await pool.query(sql, [dataHora, descricao, registrado, alunoId]);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const update = async (id,dataHora, descricao, registrado, alunoId) => {
    const sql = ` 
    UPDATE 
        destaque_positivo 
    SET  
        datahora = $1, 
        descricao = $2, 
        registrado = $3, 
        aluno_id = $4 
    WHERE 
        id = $5
    `;

    try {
        const result = await pool.query(sql, [dataHora, descricao, registrado, alunoId, id]);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deletar = async (id) => {
    const sql = `
    DELETE FROM destaque_positivo
    WHERE id = $1
    `;
    try{
        const result = await pool.query(sql,[id]);
        return result.rows;
    }catch(error){
        console.error(error);
        throw error;
    }

}