import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Turma = sequelize.define('Turma', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'turma',
  timestamps: false,
});

export default Turma;
