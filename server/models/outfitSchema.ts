import { Attribute, PrimaryKey, NotNull, BelongsToMany, Default } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core';
import { Item } from './itemSchema';

export class Outfit extends Model<InferAttributes<Outfit>, InferCreationAttributes<Outfit>> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  declare occasion: string[];

  @Attribute(DataTypes.STRING)
  declare season: string[];
  
  @Attribute(DataTypes.UUID)
  @NotNull
  declare userId: string;

  @BelongsToMany(() => Item, { through: 'ItemOutfit' })
  declare items?: NonAttribute<Item[]>;
}