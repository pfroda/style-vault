import { Attribute, PrimaryKey, NotNull, BelongsToMany, Default, HasMany } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core';
import { Outfit } from './outfitSchema';
import { Closet } from './closetSchema';
import { FavoriteItem } from './favoriteItemSchema';

export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  declare id: CreationOptional<string>;
  
  @Attribute(DataTypes.UUID)
  @NotNull
  declare userId: string;

  @BelongsToMany(() => Closet, { through: 'ClosetItem' })
  declare closets: Closet[];

  @Attribute(DataTypes.STRING)
  @NotNull
  declare category: string;

  @Attribute(DataTypes.STRING)
  // @NotNull
  declare itemUrl: string;

  @Attribute(DataTypes.ARRAY(DataTypes.STRING))
  declare occasion: string[];

  @Attribute(DataTypes.ARRAY(DataTypes.STRING))
  declare season: string[];

  @Attribute(DataTypes.ARRAY(DataTypes.STRING))
  declare color: string[];

  @Attribute(DataTypes.STRING)
  declare brand: string;

  @Attribute(DataTypes.STRING)
  declare location: string;

  @BelongsToMany(() => Outfit, { through: 'ItemOutfit' })
  declare outfits?: NonAttribute<Outfit[]>;

  @HasMany(() => FavoriteItem, 'itemId')
  declare favorites?: NonAttribute<FavoriteItem[]>;

  
}







