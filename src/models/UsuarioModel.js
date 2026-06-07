import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  perfil: {
    type: DataTypes.STRING,
  },
  senha: {
    type: DataTypes.STRING,
  },
  matricula: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  turma_id: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'usuario',
  timestamps: false,
});

export default Usuario;
