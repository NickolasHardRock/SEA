# SEA



Repositório para o desenvolvimento da aplicação do projeto de extensão


-- ============================================

-- SCRIPT COMPLETO DO BANCO DE DADOS SEA

-- Autor: Nickolas de Carlos Lamin

-- Data: 28/03/2026

-- ============================================

-- Criação das tabelas
CREATE TABLE perfil (
    id_perfil SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL
);

CREATE TABLE gravidade (
    id_gravidade SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL
);

CREATE TABLE tipo_ocorrencia (
    id_tipo SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL
);

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    perfil INT NOT NULL,
    senha TEXT NOT NULL,
    FOREIGN KEY (perfil) REFERENCES perfil(id_perfil)
);

CREATE TABLE aluno (
    id_aluno SERIAL PRIMARY KEY,
    matricula INT UNIQUE NOT NULL,
    turma VARCHAR(100),
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario)
);

CREATE TABLE ocorrencia (
    id_ocorrencia SERIAL PRIMARY KEY,
    datahora TIMESTAMP NOT NULL,
    tipo_ocorrencia INT NOT NULL,
    descricao TEXT,
    acao_tomada VARCHAR(254),
    registrado_por INT NOT NULL,
    aluno_id INT NOT NULL,
    gravidade_id INT NOT NULL,
    FOREIGN KEY (tipo_ocorrencia) REFERENCES tipo_ocorrencia(id_tipo),
    FOREIGN KEY (registrado_por) REFERENCES usuario(id_usuario),
    FOREIGN KEY (aluno_id) REFERENCES aluno(id_aluno),
    FOREIGN KEY (gravidade_id) REFERENCES gravidade(id_gravidade)
);

CREATE TABLE destaque_positivo (
    id SERIAL PRIMARY KEY,
    datahora TIMESTAMP NOT NULL,
    descricao TEXT,
    registrado INT NOT NULL,
    aluno_id INT NOT NULL,
    FOREIGN KEY (registrado) REFERENCES usuario(id_usuario),
    FOREIGN KEY (aluno_id) REFERENCES aluno(id_aluno)
);

-- ============================================
-- Inserts de exemplo
-- ============================================

-- Perfis
INSERT INTO perfil (descricao) VALUES
('Professor'),
('Coordenador'),
('Diretor'),
('Responsavel');

-- Gravidade
INSERT INTO gravidade (descricao) VALUES
('Leve'),
('Média'),
('Alta');

-- Tipos de Ocorrência
INSERT INTO tipo_ocorrencia (descricao) VALUES
('Comportamento'),
('Atraso'),
('Rendimento'),
('Material');

-- Usuários
INSERT INTO usuario (nome, email, perfil, senha) VALUES
('Carlos Silva', 'carlos.silva@escola.com', 1, 'senha123'),
('Maria Souza', 'maria.souza@escola.com', 2, 'senha456'),
('João Pereira', 'joao.pereira@escola.com', 3, 'senha789');

-- Alunos
INSERT INTO aluno (matricula, turma, usuario_id) VALUES
(2026001, 'Turma A', 1),
(2026002, 'Turma B', 2);

-- Ocorrências
INSERT INTO ocorrencia (datahora, tipo_ocorrencia, descricao, acao_tomada, registrado_por, aluno_id, gravidade_id) VALUES
('2026-03-28 10:30:00', 1, 'Aluno apresentou comportamento inadequado em sala', 'Advertência verbal', 1, 1, 2),
('2026-03-28 11:00:00', 2, 'Aluno chegou atrasado na aula', 'Registro no sistema', 2, 2, 1);

-- Destaques Positivos
INSERT INTO destaque_positivo (datahora, descricao, registrado, aluno_id) VALUES
('2026-03-28 09:00:00', 'Aluno ajudou colegas em atividade de grupo', 1, 1),
('2026-03-28 09:30:00', 'Aluno demonstrou excelente desempenho em matemática', 2, 2);
