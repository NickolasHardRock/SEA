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
    seedDB();
  }
});

function seedDB() {
  db.serialize(() => {
    console.log('\n========================================');
    console.log('   Inserindo Dados de Teste no Banco   ');
    console.log('========================================\n');

    // Inserir usuários
    db.run(`
      INSERT INTO usuario (nome, email, perfil, senha) 
      VALUES 
        ('Prof. João Silva', 'joao@escola.com', 'professor', 'senha123'),
        ('Prof. Maria Santos', 'maria@escola.com', 'professor', 'senha123'),
        ('Admin Sistema', 'admin@escola.com', 'admin', 'admin123')
    `, (err) => {
      if (err) console.error('❌ Erro ao inserir usuários:', err);
      else console.log('✅ Usuários inseridos com sucesso');
    });

    // Inserir alunos
    db.run(`
      INSERT INTO aluno (matricula, turma, usuario_id) 
      VALUES 
        ('2026001', 'Turma A', 1),
        ('2026002', 'Turma B', 2),
        ('2026003', 'Turma A', 1),
        ('2026004', 'Turma C', 2),
        ('2026005', 'Turma B', 1)
    `, (err) => {
      if (err) console.error('❌ Erro ao inserir alunos:', err);
      else console.log('✅ Alunos inseridos com sucesso');
    });

    // Inserir ocorrências
    db.run(`
      INSERT INTO ocorrencia (datahora, tipo_ocorrencia, descricao, acao_tomada, registrado_por, aluno_id, gravidade_id) 
      VALUES 
        (datetime('now', '-5 days'), 1, 'Comportamento inadequado em sala de aula', 'Conversa com aluno', 1, 1, 2),
        (datetime('now', '-3 days'), 2, 'Atraso recorrente nas aulas', 'Aviso aos pais', 2, 2, 1),
        (datetime('now', '-2 days'), 3, 'Não realiza as atividades propostas', 'Acompanhamento especial', 1, 3, 2),
        (datetime('now', '-1 days'), 1, 'Desrespeito com colega', 'Suspensão 1 dia', 2, 4, 3),
        (datetime('now'), 4, 'Esqueceu do material escolar', 'Empréstimo de material', 1, 5, 1)
    `, (err) => {
      if (err) console.error('❌ Erro ao inserir ocorrências:', err);
      else console.log('✅ Ocorrências inseridas com sucesso');
    });

    // Inserir destaques positivos
    db.run(`
      INSERT INTO destaque_positivo (datahora, descricao, registrado, aluno_id) 
      VALUES 
        (datetime('now', '-4 days'), 'Excelente desempenho em matemática', 1, 1),
        (datetime('now', '-2 days'), 'Ajudou colegas em atividade de grupo', 2, 2),
        (datetime('now', '-1 days'), 'Apresentação criativa no projeto', 1, 3),
        (datetime('now'), 'Participação ativa nas discussões em classe', 2, 5)
    `, (err) => {
      if (err) console.error('❌ Erro ao inserir destaques:', err);
      else console.log('✅ Destaques positivos inseridos com sucesso');
    });

    // Listar dados inseridos
    setTimeout(() => {
      console.log('\n========================================');
      console.log('         Dados Inseridos no Banco      ');
      console.log('========================================\n');

      // Usuarios
      db.all('SELECT * FROM usuario', (err, rows) => {
        if (err) console.error('Erro:', err);
        else {
          console.log('👥 USUÁRIOS:');
          rows.forEach(row => {
            console.log(`   ID: ${row.id_usuario} | ${row.nome} (${row.perfil})`);
          });
        }
      });

      // Alunos
      db.all('SELECT * FROM aluno', (err, rows) => {
        if (err) console.error('Erro:', err);
        else {
          console.log('\n📚 ALUNOS:');
          rows.forEach(row => {
            console.log(`   ID: ${row.id_aluno} | Matrícula: ${row.matricula} | Turma: ${row.turma}`);
          });
        }
      });

      // Ocorrências
      db.all('SELECT * FROM ocorrencia', (err, rows) => {
        if (err) console.error('Erro:', err);
        else {
          console.log('\n⚠️ OCORRÊNCIAS:');
          console.log(`   Total: ${rows.length} registros`);
        }
      });

      // Destaques
      db.all('SELECT * FROM destaque_positivo', (err, rows) => {
        if (err) console.error('Erro:', err);
        else {
          console.log('\n⭐ DESTAQUES POSITIVOS:');
          console.log(`   Total: ${rows.length} registros`);
          console.log('\n========================================\n');
        }
      });
    }, 500);
  });

  setTimeout(() => {
    db.close();
    console.log('✅ Dados de teste inseridos com sucesso!');
    console.log('\n💡 Próximos passos:');
    console.log('   1. Execute: npm run dev');
    console.log('   2. Acesse: http://localhost:3000');
    console.log('   3. Veja os dados no dashboard\n');
  }, 2000);
}
