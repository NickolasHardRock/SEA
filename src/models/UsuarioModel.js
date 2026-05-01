
import pool from '../config/dbConnect.js'

import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';

const Usuario = sequelize.define('Usuario',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
    },
    email:{
        type:DataTypes.TEXT,
        unique:true,
        allowNull:false
    },
    perfil:{
        type:DataTypes.ENUM,
        values:['Professor', 'Coordenador', 'Diretor', 'Responsavel', 'Aluno'],
        allowNull:true
    },
    senha:{
        type:DataTypes.TEXT,
        allowNull:false
    }

    
})

export default Usuario

