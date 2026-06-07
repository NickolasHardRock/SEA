
import db from '../config/dbConnect.js'

export const findAll = async () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT 
            id_usuario,
            nome,
            email,
            perfil,
            senha
            FROM usuario 
            ORDER BY id_usuario DESC`;
        
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Erro ao buscar usuários:', err);
                reject(err);
            } else {
                resolve(rows || []);
            }
        });
    });
};

export const findIndex = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT
            id_usuario,
            nome,
            email,
            perfil,
            senha
            FROM usuario
            WHERE id_usuario = ?`;

        db.get(sql, [id], (err, row) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(row ? [row] : []);
            }
        });
    });
};

export const create = async (nome, email, perfil, senha) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO usuario (nome, email, perfil, senha) 
                     VALUES (?, ?, ?, ?)`;

        db.run(sql, [nome, email, perfil, senha], function(err) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve({ id_usuario: this.lastID, nome, email, perfil, senha });
            }
        });
    });
};

export const update = async (nome, email, perfil, senha, id) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE usuario 
                     SET nome = ?, email = ?, perfil = ?, senha = ?
                     WHERE id_usuario = ?`;

        db.run(sql, [nome, email, perfil, senha, id], function(err) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve({ id_usuario: id, nome, email, perfil, senha });
            }
        });
    });
};

export const deletar = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM usuario WHERE id_usuario = ?`;
        
        db.run(sql, [id], function(err) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve({ deletado: this.changes > 0 });
            }
        });
    });
}