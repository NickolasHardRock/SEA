
import pool from '../config/dbConnect.js'


export const findAll = async () => {

    const sql = `SELECT 
    id_usuario,
    nome,
    email,
    perfil,
    senha
    FROM usuario 
	ORDER BY id_usuario DESC
    `;
    try{
        const result = await pool.query(sql);
        return result.rows;
    }catch(error){
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
};