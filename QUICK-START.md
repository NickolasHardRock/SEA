# 🚀 Guia Rápido - SEA

## ⚡ Início Rápido em 4 Passos

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Executar Migrations (Criar Banco de Dados)
```bash
npm run db:migrate
```

### 3️⃣ (Opcional) Inserir Dados de Teste
```bash
npm run db:seed
```

### 4️⃣ Iniciar o Servidor
```bash
npm run dev
```

### 5️⃣ Acessar a Aplicação
Abra seu navegador em: **http://localhost:3000**

---

## 📋 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor em modo desenvolvimento (com reload automático) |
| `npm start` | Inicia servidor em produção |
| `npm run db:migrate` | Executa migrations (cria tabelas do banco) |
| `npm run db:migrate:undo` | Desfaz todas as migrations |
| `npm run db:seed` | Insere dados de teste no banco |
| `npm run db:setup` | Executa migrations + seed em um comando |

---

## 🗂️ Estrutura

```
SEA/
├── sea-frontend/        # Frontend (HTML, CSS, JS)
├── src/
│   ├── config/         # Configuração do banco (Sequelize)
│   ├── controllers/    # Lógica dos endpoints
│   ├── models/         # Modelos Sequelize
│   ├── migrations/     # Migrations do banco
│   ├── seeders/        # Dados de teste
│   └── routes/         # Rotas da API
├── .sequelizerc         # Configuração Sequelize CLI
├── server.js           # Servidor Express
└── package.json        # Dependências
```

---

## 🔧 Tecnologias

- **Backend**: Node.js + Express + Sequelize ORM
- **Banco**: SQLite 3 (arquivo `gea.db`)
- **Frontend**: HTML/CSS/JavaScript vanilla

---

## 📊 API

### Base URL
```
http://localhost:3000/api
```

### Endpoints Principais

**Usuários**
- `GET /usuario` - Listar
- `POST /usuario/NovoUsuario` - Criar

**Alunos**
- `GET /aluno` - Listar
- `POST /aluno/NovoAluno` - Criar

**Ocorrências**
- `GET /ocorrencia` - Listar
- `POST /ocorrencia/NovoOcorrencia` - Criar

**Destaques**
- `GET /destaquePositivo` - Listar
- `POST /destaquePositivo/NovoDestaquePositivo` - Criar

---

## ✅ O que foi Migrado para Sequelize

- ✅ Models convertidos para Sequelize ORM
- ✅ Migrations criadas para criação de tabelas
- ✅ Seeders criados para dados de teste
- ✅ Controllers atualizados para usar modelos Sequelize
- ✅ Relacionamentos entre tabelas configurados
- ✅ Validações e constraints adicionadas
- ✅ Scripts npm simplificados

---

## 💡 Dicas

1. **Quer resetar o banco?**
   - Execute: `npm run db:migrate:undo && npm run db:migrate`
   - Isso apaga e recria as tabelas

2. **Quer reiniciar com dados de teste?**
   - Execute: `npm run db:migrate:undo && npm run db:setup`

3. **Dados não aparecem?**
   - Verifique se o servidor está rodando (porta 3000)
   - Abra o Console (F12) para ver erros
   - Verifique se o arquivo `gea.db` foi criado

4. **Erro de "SQLITE_CANTOPEN"?**
   - Verifique permissões de pasta
   - Execute em modo administrativo se necessário

---

## 📖 Documentação Completa

Veja `LEIA-ME.md` para documentação detalhada com exemplos de chamadas à API.

---

**Status: ✅ Projeto Pronto com Sequelize ORM**
