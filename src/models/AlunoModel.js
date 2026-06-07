import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Aluno = sequelize.define('Aluno', {
  id_aluno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  matricula: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  turma: {
    type: DataTypes.STRING,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'aluno',
  timestamps: false,
});

export default Aluno;
