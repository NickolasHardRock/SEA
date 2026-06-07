import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../gea.db'),
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao banco de dados SQLite');
    await sequelize.sync();
    console.log('✅ Modelos sincronizados');
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco:', error);
    throw error;
  }
};

export default sequelize;
