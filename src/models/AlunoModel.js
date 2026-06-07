import db from '../config/dbConnect.js'

export const findAll = async () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT 
                    id_aluno,
                    matricula,
                    turma,
                    usuario_id
                    FROM aluno`;
        
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Erro ao buscar os alunos:', err);
                reject(err);
            } else {
                resolve(rows || []);
            }
        });
    });
};

export const findIndex = async  (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT 
                    id_aluno,
                    matricula,
                    turma,
                    usuario_id
                    FROM aluno 
                    WHERE id_aluno = ?`;
        
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

export const create = async (matricula, turma, usuario_id) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO aluno (matricula, turma, usuario_id) 
                     VALUES (?, ?, ?)`;

        db.run(sql, [matricula, turma, usuario_id], function(err) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve({ id_aluno: this.lastID, matricula, turma, usuario_id });
            }
        });
    });
};

export const update = async (matricula, turma, id) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE aluno 
                     SET matricula = ?, turma = ?
                     WHERE id_aluno = ?`;
        
        db.run(sql, [matricula, turma, id], function(err) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve({ id_aluno: id, matricula, turma });
            }
        });
    });
};

export const deletar = async(id) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM aluno WHERE id_aluno = ?`;
        
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


