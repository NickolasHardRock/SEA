import dotenv from 'dotenv';
import pg from 'pg';


dotenv.config();

const {Pool} = pg;

const pool = new Pool({
  user: process.env.DB_USER,       // seu usuário
  host: process.env.DB_HOST,      // ou IP do servidor
  database: process.env.DB_NAME,        // nome do banco
  password: process.env.DB_PASS,  // senha definida na instalação
  port: process.env.DB_PORT,         
})

export default  pool;

