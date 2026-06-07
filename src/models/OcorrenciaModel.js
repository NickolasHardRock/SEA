import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Ocorrencia = sequelize.define('Ocorrencia', {
  id_ocorrencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  datahora: {
    type: DataTypes.DATE,
  },
  tipo_ocorrencia: {
    type: DataTypes.STRING,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  acao_tomada: {
    type: DataTypes.TEXT,
  },
  registrado_por: {
    type: DataTypes.INTEGER,
  },
  aluno_id: {
    type: DataTypes.INTEGER,
  },
  gravidade_id: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'ocorrencia',
  timestamps: false,
});

export default Ocorrencia;
