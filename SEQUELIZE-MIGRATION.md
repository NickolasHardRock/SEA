# 🔄 Migração para Sequelize ORM

## Mudanças Realizadas

O projeto foi convertido de um sistema simples de banco SQLite para usar **Sequelize ORM**, que oferece:

- ✅ **Modelos bem estruturados** - Definição clara de tabelas e relacionamentos
- ✅ **Migrations** - Controle de versão do schema do banco de dados
- ✅ **Seeders** - Dados de teste gerenciáveis e reproduzíveis
- ✅ **Validações** - Constraints e validações de dados
- ✅ **Segurança** - Proteção contra SQL injection
- ✅ **Escalabilidade** - Fácil adicionar novas tabelas e relacionamentos

---

## 📋 Arquivos Novos Criados

### Configuração
- `.sequelizerc` - Configuração do Sequelize CLI
- `config/database.js` - Conexão e configuração do banco (ES6)

### Modelos Sequelize
- `src/models/index.js` - Loader de modelos
- `src/models/Usuario.js` - Modelo de usuário
- `src/models/Aluno.js` - Modelo de aluno
- `src/models/Ocorrencia.js` - Modelo de ocorrência
- `src/models/DestaquePositivo.js` - Modelo de destaque positivo

### Migrations
- `src/migrations/001-create-initial-schema.js` - Criação das 4 tabelas

### Seeders
- `src/seeders/001-seed-data.js` - Dados de teste

---

## 🔧 Arquivos Atualizados

### Controllers (Todos convertidos para Sequelize)
- `src/controllers/UsuarioController.js`
- `src/controllers/AlunoController.js`
- `src/controllers/OcorrenciaController.js`
- `src/controllers/DestaquePositivo.js`

### Sistema
- `src/config/dbConnect.js` - Novo sistema de conexão Sequelize
- `server.js` - Inicialização com conexão ao banco
- `package.json` - Novas dependências e scripts

---

## 📦 Dependências Adicionadas

```json
{
  "dependencies": {
    "sequelize": "^6.35.2"
  },
  "devDependencies": {
    "sequelize-cli": "^6.6.2"
  }
}
```

---

## 🚀 Como Usar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar Migrations (Criar Banco)
```bash
npm run db:migrate
```

### 3. Inserir Dados de Teste (Opcional)
```bash
npm run db:seed
```

### 4. Iniciar o Servidor
```bash
npm run dev
```

---

## 📊 Relacionamentos Configurados

```
Usuario (1) ----< (N) Aluno
           |----< (N) Ocorrencia (registrado_por)
           |----< (N) DestaquePositivo (registrado)

Aluno (1) ----< (N) Ocorrencia
      |----< (N) DestaquePositivo
```

---

## 🔄 Desfazer Migrations

Se algo der errado, você pode desfazer todas as migrations:

```bash
npm run db:migrate:undo
```

Isso apagará todas as tabelas.

---

## 📝 Exemplo de Uso - Criar um Novo Aluno

### Via API REST
```bash
curl -X POST http://localhost:3000/api/aluno/NovoAluno \
  -H "Content-Type: application/json" \
  -d '{
    "matricula": "MAT999",
    "turma": "9C",
    "usuario_id": 1
  }'
```

### Resposta
```json
{
  "id_aluno": 6,
  "matricula": "MAT999",
  "turma": "9C",
  "usuario_id": 1,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

## 🛠️ Comandos Sequelize Úteis

```bash
# Criar um modelo novo
npx sequelize-cli model:generate --name NovaTabela

# Criar uma migration
npx sequelize-cli migration:generate --name add-column-to-table

# Criar um seeder
npx sequelize-cli seed:generate --name seed-nova-tabela

# Listar status de migrations
npx sequelize-cli db:migrate:status
```

---

## 📖 Mais Informações

Consulte a documentação oficial: [Sequelize Docs](https://sequelize.org/)

---

**Status: ✅ Projeto Migrado para Sequelize com Sucesso**
