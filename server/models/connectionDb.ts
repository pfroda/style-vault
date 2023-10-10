import * as dotenv from 'dotenv';
import { Sequelize, Dialect } from '@sequelize/core';

import { User } from './userSchema';
import { Item } from './itemSchema';
import { Outfit } from './outfitSchema';

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
    models: [User, Item, Outfit],
  }
);

const db: any = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync({ force: false }).then(() => {
  console.log('Well done Cintia! Re-sync done on DB 📑!');
});

export default db;
