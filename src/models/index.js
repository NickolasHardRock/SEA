import sequelize from "../config/dbConnect";
import Usuario from "../models/UsuarioModel.js"
import DestaquePositivo from "../models/DestaquePositivoModel.js"
import Ocorrencia from "../models/OcorrenciaModel.js"
import Turma from "../models/TurmaModel.js"

const initModels = () =>{

Usuario.hasOne(Turma,{
    foreignKey: 'responsavel_id'
});

Usuario.hasMany(Ocorrencia,{
    foreignKey: 'aluno_id'
});
Ocorrencia.belongsTo(Usuario,{
    foreignKey:'aluno_id'
});

Usuario.hasMany(Ocorrencia,{
    foreignKey:'registroPor_id'
});
Ocorrencia.belongsTo(Usuario,{
    foreignKey:'registroPor_id'
})

Usuario.hasMany(DestaquePositivo,{
    foreignKey:'registrado_por_id'
})

DestaquePositivo.belongsTo(Usuario,{
    foreignKey:'registrado_por_id'
})

Usuario.hasMany(DestaquePositivo,{
    foreignKey:'aluno_id'
})

DestaquePositivo.belongsTo(Usuario,{
    foreignKey:'aluno_id'
})



}




