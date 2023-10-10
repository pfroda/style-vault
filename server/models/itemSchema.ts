import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';

export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare closet: string[];

  @Attribute(DataTypes.STRING)
  @NotNull
  declare category: string;

  @Attribute(DataTypes.STRING)
  declare occasion: string[];

  @Attribute(DataTypes.STRING)
  declare season: string[];

  @Attribute(DataTypes.STRING)
  declare color: string[];

  @Attribute(DataTypes.STRING)
  declare brand: string;

  @Attribute(DataTypes.STRING)
  declare surname: string;
  
  @Attribute(DataTypes.STRING)
  @NotNull
  declare userId: number;
}