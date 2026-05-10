import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/config/dbConnect.js';
import UsuariosRoutes from './src/routes/UsuarioRoutes.js';
import AlunosRoutes from './src/routes/AlunoRoutes.js';
import DestaquePositivoRoutes from './src/routes/DestaquePositivo.js';
import OcorrenciaRoutes from './src/routes/OcorrenciaRoutes.js';
dotenv.config();

const app = express();

app.use(express.json(),cors());

const PORT = 5432;


app.use('/api/usuario',UsuariosRoutes);

app.use('/api/aluno', AlunosRoutes);

app.use('/api/destaquePositivo', DestaquePositivoRoutes);

app.use('/api/ocorrencia', OcorrenciaRoutes);

async function main() {
    try{
        await sequelize.authenticate();
        await sequelize.sync({alter:true}).then(() => console.log("Tabelas criadas/atualizas"))
        .catch(err => console.error("Erro ao sincronizar:",err));
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        
app.listen(PORT,() =>{
    console.log(`Servidor escutando ${PORT}`);
});
    }catch(error){
        console.error('Não foi possível conectar ao banco de dados:',error)
    }
}

main();
