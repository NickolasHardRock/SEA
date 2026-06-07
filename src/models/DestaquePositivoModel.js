import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const DestaquePositivo = sequelize.define('DestaquePositivo', {
  id_destaque: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  datahora: {
    type: DataTypes.DATE,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  registrado_por: {
    type: DataTypes.INTEGER,
  },
  aluno_id: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'destaque_positivo',
  timestamps: false,
});

export default DestaquePositivo;
