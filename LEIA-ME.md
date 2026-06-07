# Projeto SEA - Sistema de Educação em Ação

Sistema para gerenciamento de ocorrências e destaques positivos de alunos.

## Alterações Realizadas

### 1. **Migração de Banco de Dados**
- ✅ Convertido de PostgreSQL para **SQLite 3**
- ✅ Removidas dependências: `pg`, `mongodb`, `mongoose`
- ✅ Adicionada dependência: `sqlite3`

### 2. **Correção de Erros no Backend**
- ✅ **AlunoModel.js**: Corrigida sintaxe SQL na função `update` (faltava vírgula)
- ✅ **AlunoModel.js**: Corrigida sintaxe SQL na função `deletar` (faltava `= ?`)
- ✅ **OcorrenciaModel.js**: Removida vírgula extra na função `update`
- ✅ **Controllers**: Corrigidos status HTTP (201 para GET → 200)
- ✅ **UsuarioController.js**: Removido console.log desnecessário
- ✅ **DestaquePositivo.js**: Corrigido nome da função `procurarDestaquePostivio` → `procurarDestaquePositivo`
- ✅ **OcorrenciaController.js**: Adicionado `return` faltante em catch

### 3. **Atualização do Frontend**
- ✅ Removida função `inicializarDados()` com dados simulados
- ✅ Implementadas funções `carregarAlunos()`, `carregarOcorrencias()`, `carregarDestaques()`, `carregarUsuarios()`
- ✅ Todas as operações agora fazem requisições HTTP para a API
- ✅ Corrigido typo: "Response status" (estava "Respsonse")
- ✅ Frontend agora sincroniza com o backend em tempo real

### 4. **Melhorias no Servidor**
- ✅ Servidor agora serve arquivos estáticos do frontend
- ✅ Adicionado suporte a rotas não encontradas

## Instalação

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Passos de Instalação

1. **Clone o repositório**
```bash
cd SEA
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicialize o banco de dados**
```bash
npm run init-db
```
Isso criará o arquivo `gea.db` com as tabelas necessárias.

4. **Inicie o servidor**
```bash
npm run dev
```
ou em produção:
```bash
npm start
```

5. **Acesse a aplicação**
Abra seu navegador e vá para:
```
http://localhost:3000
```

## Estrutura do Banco de Dados

### Tabelas Criadas

- **usuario**: Armazena usuários do sistema
- **aluno**: Armazena informações dos alunos
- **ocorrencia**: Registra ocorrências dos alunos
- **destaque_positivo**: Registra destaques positivos dos alunos

## Scripts Disponíveis

```json
{
  "dev": "nodemon server.js",
  "start": "node server.js",
  "init-db": "node init-db.js"
}
```

## API Endpoints

### Usuários
- `GET /api/usuario` - Listar todos os usuários
- `GET /api/usuario/id/:id` - Buscar usuário por ID
- `POST /api/usuario/NovoUsuario` - Criar novo usuário
- `PUT /api/usuario/AtualizarUsuario/:id` - Atualizar usuário
- `DELETE /api/usuario/DeletarUsuario/:id` - Deletar usuário

### Alunos
- `GET /api/aluno` - Listar todos os alunos
- `GET /api/aluno/id/:id` - Buscar aluno por ID
- `POST /api/aluno/NovoAluno` - Criar novo aluno
- `PUT /api/aluno/AtualizarAluno/:id` - Atualizar aluno
- `DELETE /api/aluno/DeletarAluno/:id` - Deletar aluno

### Ocorrências
- `GET /api/ocorrencia` - Listar todas as ocorrências
- `GET /api/ocorrencia/id/:id` - Buscar ocorrência por ID
- `POST /api/ocorrencia/NovoOcorrencia` - Criar nova ocorrência
- `PUT /api/ocorrencia/AtualizarOcorrencia/:id` - Atualizar ocorrência
- `DELETE /api/ocorrencia/DeletarOcorrencia/:id` - Deletar ocorrência

### Destaques Positivos
- `GET /api/destaquePositivo` - Listar todos os destaques
- `GET /api/destaquePositivo/id/:id` - Buscar destaque por ID
- `POST /api/destaquePositivo/NovoDestaquePositivo` - Criar novo destaque
- `PUT /api/destaquePositivo/AtualizarDestaquePositivo/:id` - Atualizar destaque
- `DELETE /api/destaquePositivo/DeletarDestaquePositivo/:id` - Deletar destaque

## Exemplo de Dados

### Criar um Usuário
```bash
curl -X POST http://localhost:3000/api/usuario/NovoUsuario \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Professor",
    "email": "joao@escola.com",
    "perfil": "professor",
    "senha": "senha123"
  }'
```

### Criar um Aluno
```bash
curl -X POST http://localhost:3000/api/aluno/NovoAluno \
  -H "Content-Type: application/json" \
  -d '{
    "matricula": "2026001",
    "turma": "Turma A",
    "usuario_id": 1
  }'
```

## Tecnologias Utilizadas

- **Backend**: Express.js
- **Banco de Dados**: SQLite 3
- **Frontend**: HTML, CSS, JavaScript
- **Runtime**: Node.js

## Notas Importantes

1. O arquivo `gea.db` é criado automaticamente na raiz do projeto
2. As foreign keys estão habilitadas no SQLite
3. Os timestamps são registrados automaticamente para cada registro
4. O frontend se conecta à API em `http://localhost:3000/api`

## Troubleshooting

### Erro: "Banco de dados locked"
- Feche todas as conexões com o banco antes de executar novamente

### Erro: "Cannot find module 'sqlite3'"
- Execute: `npm install`

### Frontend não carrega dados
- Verifique se o servidor está rodando em `http://localhost:3000`
- Abra o console do navegador (F12) para ver erros

## Estrutura do Projeto

```
SEA/
├── src/
│   ├── config/
│   │   └── dbConnect.js (configuração do SQLite)
│   ├── controllers/
│   │   ├── UsuarioController.js
│   │   ├── AlunoController.js
│   │   ├── OcorrenciaController.js
│   │   └── DestaquePositivo.js
│   ├── models/
│   │   ├── UsuarioModel.js
│   │   ├── AlunoModel.js
│   │   ├── OcorrenciaModel.js
│   │   └── DestaquePositivoModel.js
│   └── routes/
│       ├── UsuarioRoutes.js
│       ├── AlunoRoutes.js
│       ├── OcorrenciaRoutes.js
│       └── DestaquePositivo.js
├── sea-frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js (atualizado para usar API)
├── init-db.js (inicializa banco de dados)
├── server.js (servidor Express)
├── package.json
└── README.md
```

## Contribuições

Para contribuir com o projeto, por favor:
1. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
2. Commit suas mudanças (`git commit -am 'Add MinhaFeature'`)
3. Push para a branch (`git push origin feature/MinhaFeature`)
4. Abra um Pull Request
