import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnect";

const DestaquePositivo = sequelize.define('DestaquePositivo', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
    },
    data_hora:{
        type:DataTypes.DATE,
        allowNull:true
    },
    dsecricao:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    registrado_por_id:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:true
    },
    aluno_id:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:true
    }
})

export default DestaquePositivo