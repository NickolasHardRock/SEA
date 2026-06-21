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
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  perfil: {
    type: DataTypes.STRING,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: true
  },
  matricula: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: true
  },
  turma_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
}, {
  tableName: 'usuario',
  timestamps: false,
});

export default Usuario;
