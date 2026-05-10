import { DataTypes } from "sequelize";
import sequelize  from "../config/dbConnect.js";

const Turma = sequelize.define('Turma',{
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
        primaryKey:true,
        allowNull:true,
        autoIncrement:true
    },
    nome:{
        type:DataTypes.TEXT,
        allowNull: true
    },
    responsavel_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull:false
    }

})

export default Turma
