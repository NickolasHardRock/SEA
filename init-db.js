import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'gea.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao SQLite:', err);
    process.exit(1);
  } else {
    console.log('Conectado ao banco SQLite: ' + dbPath);
    db.run("PRAGMA foreign_keys = ON");
    initDB();
  }
});

function initDB() {
  db.serialize(() => {
    // Tabela de usuários
    db.run(`
      CREATE TABLE IF NOT EXISTS usuario (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        perfil TEXT NOT NULL,
        senha TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error('Erro ao criar tabela usuario:', err);
      else console.log('Tabela usuario criada ou já existe');
    });

    // Tabela de alunos
    db.run(`
      CREATE TABLE IF NOT EXISTS aluno (
        id_aluno INTEGER PRIMARY KEY AUTOINCREMENT,
        matricula TEXT UNIQUE NOT NULL,
        turma TEXT NOT NULL,
        usuario_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario)
      )
    `, (err) => {
      if (err) console.error('Erro ao criar tabela aluno:', err);
      else console.log('Tabela aluno criada ou já existe');
    });

    // Tabela de ocorrências
    db.run(`
      CREATE TABLE IF NOT EXISTS ocorrencia (
        id_ocorrencia INTEGER PRIMARY KEY AUTOINCREMENT,
        datahora DATETIME NOT NULL,
        tipo_ocorrencia INTEGER NOT NULL,
        descricao TEXT NOT NULL,
        acao_tomada TEXT,
        registrado_por INTEGER NOT NULL,
        aluno_id INTEGER NOT NULL,
        gravidade_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (registrado_por) REFERENCES usuario(id_usuario),
        FOREIGN KEY (aluno_id) REFERENCES aluno(id_aluno)
      )
    `, (err) => {
      if (err) console.error('Erro ao criar tabela ocorrencia:', err);
      else console.log('Tabela ocorrencia criada ou já existe');
    });

    // Tabela de destaques positivos
    db.run(`
      CREATE TABLE IF NOT EXISTS destaque_positivo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        datahora DATETIME NOT NULL,
        descricao TEXT NOT NULL,
        registrado INTEGER NOT NULL,
        aluno_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (registrado) REFERENCES usuario(id_usuario),
        FOREIGN KEY (aluno_id) REFERENCES aluno(id_aluno)
      )
    `, (err) => {
      if (err) console.error('Erro ao criar tabela destaque_positivo:', err);
      else console.log('Tabela destaque_positivo criada ou já existe');
    });

    console.log('Banco de dados inicializado com sucesso!');
  });

  setTimeout(() => {
    db.close();
    console.log('Conexão com banco de dados fechada');
  }, 1000);
}
