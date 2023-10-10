import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import { Item } from './itemSchema';

export class Outfit extends Model<InferAttributes<Outfit>, InferCreationAttributes<Outfit>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  declare occasion: string[];

  @Attribute(DataTypes.STRING)
  declare season: string[];
  
  @Attribute(DataTypes.STRING)
  @NotNull
  declare userId: number;

  // @HasMany(() => Item, 'userId')
  // declare items?: NonAttribute<Item[]>;
}


// @Attribute(DataTypes.STRING)
// declare bottom: string;

// @Attribute(DataTypes.STRING)
// declare dress: string;

// @Attribute(DataTypes.STRING)
// declare shoes: string;

// @Attribute(DataTypes.STRING)
// declare outerwear: string;

// @Attribute(DataTypes.STRING)
// declare accessories: string[];