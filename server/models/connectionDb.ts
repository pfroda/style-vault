import * as dotenv from 'dotenv';
import { Sequelize, DataTypes, Dialect } from 'sequelize';
import userSchema from './userSchema';

dotenv.config();

if (!process.env.DB_DIALECT) {
  throw new Error('DB_DIALECT environment variable is not defined');
}

const dialect: Dialect = process.env.DB_DIALECT as Dialect;

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    dialect: dialect,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    logging: false,
  }
);

const db: any = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.userProfile = userSchema(sequelize);

// Associations Tables

// End Associations Tables

db.sequelize.sync({ force: false }).then(() => {
  console.log('Well done Cintia! Re-sync done on DB 📑!');
});

export default db;
