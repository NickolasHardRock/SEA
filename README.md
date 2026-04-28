# SEA

Repositório para o desenvolvimento da aplicação do projeto de extensão

-- ============================================

-- SCRIPT COMPLETO DO BANCO DE DADOS SEA

-- Autor: Nickolas de Carlos Lamin

-- Data: 27/04/2026

-- ============================================

-- Criação das tabelas

CREATE TYPE Perfil AS ENUM ('Professor', 'Coordenador', 'Diretor', 'Responsavel', 'Aluno');
CREATE TYPE TipoOcorrencia AS ENUM ('Comportamento', 'Atraso', 'Rendimento', 'Material');
CREATE TYPE Gravidade AS ENUM ('Leve', 'Media', 'Alta');

CREATE TABLE Turma (
    id_turma SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    responsavel_id INT NOT NULL
);

create table Usuario (
	id serial primary key,
	nome varchar(255) not null,
	email varchar(255) unique,
	perfil Perfil not null,
	senha Varchar(255) not null,
	matricula INT unique,
	turma_id int,
	foreign key (turma_id) references Turma(id_turma)
);

ALTER TABLE Turma(
ADD CONSTRAINT fk_responsavel
FOREIGN KEY (responsavel_id)
REFERENCES Usuario(id)
);

CREATE TABLE Ocorrencia (
    id SERIAL PRIMARY KEY,
    data_hora TIMESTAMP NOT NULL,
    tipo TipoOcorrencia NOT NULL,
    descricao TEXT NOT NULL,
    acao_tomada TEXT,
    registrado_por_id INT NOT NULL,
    aluno_id INT NOT NULL,
    gravidade_da_ocorrencia Gravidade NOT NULL,
    FOREIGN KEY (registrado_por_id) REFERENCES Usuario(id),
    FOREIGN KEY (aluno_id) REFERENCES Usuario(id)
);

CREATE TABLE DestaquePositivo (
    id SERIAL PRIMARY KEY,
    data_hora TIMESTAMP NOT NULL,
    descricao TEXT NOT NULL,
    registrado_por_id INT NOT NULL,
    aluno_id INT NOT NULL,
    FOREIGN KEY (registrado_por_id) REFERENCES Usuario(id),
    FOREIGN KEY (aluno_id) REFERENCES Usuario(id)
    );

-- ============================================
-- Inserts de exemplo
-- ============================================

-- Inserindo Usuários (Professores e Coordenadores primeiro para poderem ser responsáveis por turmas)
INSERT INTO Usuario (nome, email, perfil, senha, matricula) VALUES
('Ana Silva', 'ana.silva@escola.com', 'Professor', 'senha123', 1001),
('Carlos Souza', 'carlos.souza@escola.com', 'Coordenador', 'senha456', 1002),
('Beatriz Lima', 'beatriz.lima@escola.com', 'Diretor', 'senha789', 1003);

-- Inserindo Turmas (Referenciando os usuários acima como responsáveis)
INSERT INTO Turma (nome, responsavel_id) VALUES
('9º Ano A', 1), -- Ana Silva é a responsável
('1º Ano Médio B', 2); -- Carlos Souza é o responsável

-- Inserindo Alunos e vinculando às turmas
INSERT INTO Usuario (nome, email, perfil, senha, matricula, turma_id) VALUES
('João Pedro', 'joao.pedro@aluno.com', 'Aluno', 'aluno123', 2001, 1),
('Maria Eduarda', 'maria.eduarda@aluno.com', 'Aluno', 'aluno456', 2002, 1),
('Lucas Oliveira', 'lucas.oliveira@aluno.com', 'Aluno', 'aluno789', 2003, 2);

-- Inserindo Ocorrências
INSERT INTO Ocorrencia (data_hora, tipo, descricao, acao_tomada, registrado_por_id, aluno_id, gravidade_da_ocorrencia) VALUES
(NOW(), 'Comportamento', 'Conversa excessiva durante a aula de matemática.', 'Advertência verbal.', 1, 4, 'Leve'),
(NOW() - INTERVAL '1 day', 'Atraso', 'Chegou 20 minutos atrasado para a primeira aula.', 'Registro no sistema.', 2, 6, 'Leve'),
(NOW() - INTERVAL '2 days', 'Rendimento', 'Não entregou o trabalho bimestral de história.', 'Convocação dos responsáveis.', 1, 5, 'Media');

-- Inserindo Destaques Positivos
INSERT INTO DestaquePositivo (data_hora, descricao, registrado_por_id, aluno_id) VALUES
(NOW(), 'Excelente participação no projeto de ciências.', 1, 4),
(NOW() - INTERVAL '3 days', 'Ajudou um colega com dificuldades em programação.', 2, 6);

('2026-03-28 09:00:00', 'Aluno ajudou colegas em atividade de grupo', 1, 1),
('2026-03-28 09:30:00', 'Aluno demonstrou excelente desempenho em matemática', 2, 2);
