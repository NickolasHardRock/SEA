import db from "../config/dbConnect.js";

export const findAll = async () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT
                    id_ocorrencia,
                    datahora,
                    tipo_ocorrencia,
                    descricao,
                    acao_tomada,
                    registrado_por,
                    aluno_id,
                    gravidade_id
                    FROM ocorrencia`;
        
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Erro ao buscar Ocorrencias', err);
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
                    id_ocorrencia,
                    datahora,
                    tipo_ocorrencia,
                    descricao,
                    acao_tomada,
                    registrado_por,
                    aluno_id,
                    gravidade_id
                    FROM ocorrencia
                    WHERE id_ocorrencia = ?`;
        
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

export const create = async (dataHora, tipoOcorrencia, descricao, acaoTomada, registroPor, alunoId, gravidadeId) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO ocorrencia 
                    (datahora, tipo_ocorrencia, descricao, acao_tomada, registrado_por, aluno_id, gravidade_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;

        db.run(sql, [dataHora, tipoOcorrencia, descricao, acaoTomada, registroPor, alunoId, gravidadeId], function(err) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve({ id_ocorrencia: this.lastID, dataHora, tipoOcorrencia, descricao, acaoTomada, registroPor, alunoId, gravidadeId });
            }
        });
    });
};

export const update = async (id, tipoOcorrencia, descricao, acaoTomada) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE ocorrencia 
                    SET tipo_ocorrencia = ?, descricao = ?, acao_tomada = ?
                    WHERE id_ocorrencia = ?`;

        db.run(sql, [tipoOcorrencia, descricao, acaoTomada, id], function(err) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve({ id_ocorrencia: id, tipoOcorrencia, descricao, acaoTomada });
            }
        });
    });
};

export const deletar = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM ocorrencia WHERE id_ocorrencia = ?`;
        
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