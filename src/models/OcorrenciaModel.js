import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnect";

const Ocorrencia = sequelize.define('Ocorrencia',{
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
        primaryKey:true,
        allowNull:true,
        autoIncrement:true
    },
    data_hora:{
        type:DataTypes.DATE,
        allowNull:true
    },
    ocorrencia:{
        type:DataTypes.ENUM,
        values:['Comportamento','Atraso','Rendimento','Material'],
        allowNull:true
    },
    descricao:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    acao_tomada:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    gravidade_da_ocorrencia:{
        type:DataTypes.ENUM,
        values:['Leve','Media','Alta'],
        allowNull:true
    },
    registroPor_id:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:true
    },
    aluno_id:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:true
    }
})


export default Ocorrencia