import { Attribute, PrimaryKey, NotNull, BelongsToMany, Default } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core';
import { Outfit } from './outfitSchema';

export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  declare closet: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare category: string;

  @Attribute(DataTypes.STRING)
  // @NotNull
  declare itemUrl: string;

  @Attribute(DataTypes.STRING)
  declare occasion: string;

  @Attribute(DataTypes.STRING)
  declare season: string;

  @Attribute(DataTypes.STRING)
  declare color: string;

  @Attribute(DataTypes.STRING)
  declare brand: string;
  
  @Attribute(DataTypes.UUID)
  @NotNull
  declare userId: string;

  @BelongsToMany(() => Outfit, { through: 'ItemOutfit' })
  declare outfits?: NonAttribute<Outfit[]>;
}