import { Attribute, PrimaryKey, AutoIncrement, NotNull, BelongsToMany } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core';
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

  @BelongsToMany(() => Item, { through: 'ItemOutfit' })
  declare items?: NonAttribute<Item[]>;
}