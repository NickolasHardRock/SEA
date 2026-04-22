
import pool from '../config/dbConnect.js'

import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';

const Usuario = sequelize.define('Usuario',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    }
})


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
    try {
        const result = await pool.query(sql);
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
};

export const findIndex = async (id) => {
    const sql = `
    SELECT
    id_usuario,
    nome,
    email,
    perfil,
    senha
    FROM 
    usuario
    WHERE 
    id_usuario = $1
    `;

    try {
        const result = await pool.query(sql, [id]);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const create = async (nome, email, perfil, senha) => {
    const sql = `
    INSERT INTO usuario (nome,email,perfil,senha) VALUES ($1,$2,$3,$4)
`;

    try {
        const result = await pool.query(sql, [nome, email, perfil, senha]);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const update = async (nome, email, perfil, senha, id) => {
    const sql = ` 
    UPDATE usuario 
    SET  
    nome = $1, 
    email = $2, 
    perfil = $3, 
    senha = $4 
    WHERE id_usuario = $5
    `;

    try {
        const result = await pool.query(sql, [nome, email, perfil, senha, id]);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deletar = async (id) => {
    const sql = `
    DELETE FROM usuario
    WHERE id_usuario = $1
    `;
    try{
        const result = await pool.query(sql,[id]);
        return result.rows;
    }catch(error){
        console.error(error);
        throw error;
    }

}