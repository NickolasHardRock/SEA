import dotenv from 'dotenv';
import pg from 'pg';

import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_USER,
  process.env.DB_NAME,
  process.env.DB_PASS,
{
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT
})





// const {Pool} = pg;

// const pool = new Pool({
//   user: process.env.DB_USER,       // seu usuário
//   host: process.env.DB_HOST,      // ou IP do servidor
//   database: process.env.DB_NAME,        // nome do banco
//   password: process.env.DB_PASS,  // senha definida na instalação
//   port: process.env.DB_PORT,         
// })

export default  sequelize;

