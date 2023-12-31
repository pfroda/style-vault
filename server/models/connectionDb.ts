import * as dotenv from 'dotenv';
import { Sequelize, Dialect } from '@sequelize/core';

import { User } from './userSchema';
import { Item } from './itemSchema';
import { Outfit } from './outfitSchema';
import { Closet } from './closetSchema';
import { FavoriteItem } from './favoriteItemSchema';
import { FavoriteOutfit } from './favoriteOutfitSchema';
import { UserActivity } from './userActivitySchema';

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
    models: [User, Item, Outfit, Closet, FavoriteItem, FavoriteOutfit, UserActivity]
  }
);

export const initDb = async () => {
  await sequelize.sync({ force: false });
  console.log('Órale putos! Connected to db');
}
