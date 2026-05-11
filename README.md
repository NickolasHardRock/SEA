# SEA - Sistema Escolar de Acompanhamento

O **SEA** é uma aplicação robusta desenvolvida para facilitar o controle de ocorrências escolares e o acompanhamento detalhado do desempenho e comportamento dos alunos. O sistema visa otimizar a comunicação entre a instituição de ensino e os responsáveis, centralizando informações críticas em uma plataforma intuitiva.

---

## 🚀 Funcionalidades Principais

- **Gestão de Usuários:** Controle de acesso para diferentes perfis (administradores, professores, etc.).
- **Acompanhamento de Alunos:** Cadastro e visualização detalhada de dados acadêmicos e pessoais.
- **Registro de Ocorrências:** Sistema estruturado para documentar incidentes escolares com rapidez e precisão.
- **Destaques Positivos:** Espaço dedicado para registrar méritos, conquistas e pontos positivos dos estudantes.
- **Organização por Turmas:** Facilidade na gestão de grupos de alunos e visualização de métricas por classe.
- **Dashboard Intuitivo:** Interface moderna para visualização rápida de estatísticas e dados recentes.

---

## 🛠️ Tecnologias Utilizadas

O projeto utiliza uma stack moderna e eficiente para garantir performance e segurança:

### Backend
- **Node.js:** Ambiente de execução JavaScript no servidor.
- **Express:** Framework web para construção de APIs rápidas e flexíveis.
- **Sequelize ORM:** Mapeamento objeto-relacional para interação com o banco de dados.
- **PostgreSQL:** Banco de dados relacional potente e confiável.
- **Dotenv:** Gestão de variáveis de ambiente para segurança das configurações.

### Frontend
- **HTML5 & CSS3:** Estrutura e estilização moderna e responsiva.
- **JavaScript (ES6+):** Lógica de interação dinâmica e integração com a API.

---

## 📂 Estrutura do Projeto

```text
SEA/
├── sea-frontend/       # Interface do usuário (HTML, CSS, JS)
├── src/
│   ├── config/         # Configurações de conexão (Banco de Dados)
│   ├── controllers/    # Lógica de negócio e controle das rotas
│   ├── models/         # Definição dos modelos de dados (Sequelize)
│   └── routes/         # Definição dos endpoints da API
├── server.js           # Ponto de entrada da aplicação
└── package.json        # Dependências e scripts do projeto
```

---

## 🔧 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado.
- [PostgreSQL](https://www.postgresql.org/) configurado e em execução.

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/NickolasHardRock/SEA.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd SEA
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e adicione suas credenciais:
   ```env
   DB_NAME=seu_banco
   DB_USER=seu_usuario
   DB_PASS=sua_senha
   DB_HOST=localhost
   PORT=5432
   ```

5. Inicie o servidor:
   ```bash
   npm start
   ```

---

## 📄 Licença

Este projeto está sob a licença **GPL-3.0**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Contribuidores

- **Nickolas Lamin** ([NickolasHardRock](https://github.com/NickolasHardRock)) - Desenvolvedor Principal
