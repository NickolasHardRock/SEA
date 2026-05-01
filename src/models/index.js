import sequelize from "../config/dbConnect";
import Usuario from "../models/UsuarioModel.js"
import DestaquePositivo from "../models/DestaquePositivoModel.js"
import Ocorrencia from "../models/OcorrenciaModel.js"
import Turma from "../models/TurmaModel.js"

const initModels = () =>{

Usuario.hasOne(Turma,{
    foreignKey: 'responsavel_id'
})


}




