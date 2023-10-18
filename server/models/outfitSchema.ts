import { Attribute, PrimaryKey, NotNull, BelongsToMany, Default, HasMany} from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core';
import { Item } from './itemSchema';
import { Closet } from './closetSchema';
import { FavoriteOutfit } from './favoriteOutfitSchema';
import { User } from './userSchema';

export class Outfit extends Model<InferAttributes<Outfit>, InferCreationAttributes<Outfit>> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.UUID)
  @NotNull
  declare userId: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  declare outfitUrl: string;
  // @NotNull

  @BelongsToMany(() => Closet, { through: 'ClosetOutfit' })
  declare closets: Closet[];

  @Attribute(DataTypes.ARRAY(DataTypes.STRING))
  declare occasion: string[];

  @Attribute(DataTypes.ARRAY(DataTypes.STRING))
  declare season: string[];

  @BelongsToMany(() => Item, { through: 'ItemOutfit' })
  declare items?: NonAttribute<Item[]>;

  @HasMany(() => FavoriteOutfit, 'outfitId')
  declare favorites?: NonAttribute<FavoriteOutfit[]>;

}