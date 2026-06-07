import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './src/config/dbConnect.js';
import UsuariosRoutes from './src/routes/UsuarioRoutes.js';
import AlunosRoutes from './src/routes/AlunoRoutes.js';
import DestaquePositivoRoutes from './src/routes/DestaquePositivo.js';
import OcorrenciaRoutes from './src/routes/OcorrenciaRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'sea-frontend')));

// Rotas da API
app.use('/api/usuario', UsuariosRoutes);
app.use('/api/aluno', AlunosRoutes);
app.use('/api/destaquePositivo', DestaquePositivoRoutes);
app.use('/api/ocorrencia', OcorrenciaRoutes);

// Servir index.html para rotas não encontradas
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'sea-frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000;

// Iniciar servidor
async function startServer() {
  try {
    // Conectar ao banco de dados
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`✅ Servidor escutando na porta ${PORT}`);
      console.log(`🌐 Acesse http://localhost:${PORT} no seu navegador`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();