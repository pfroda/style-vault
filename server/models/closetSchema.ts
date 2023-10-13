import { Attribute, PrimaryKey, NotNull, BelongsToMany, Default } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core';
import { Outfit } from './outfitSchema';
import { Item } from './itemSchema';

export class Closet extends Model<InferAttributes<Closet>, InferCreationAttributes<Closet>> {
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

  @BelongsToMany(() => Item, { through: 'ClosetItem' })
  declare items: Item[];

  @BelongsToMany(() => Outfit, { through: 'ClosetOutfit' })
  declare outfits: Outfit[];

  addItems: (itemId: string[]) => Promise<void>;
  addOutfits: (outfitId: string[]) => Promise<void>;
  getItems: () => Promise<Item[]>;
  getOutfits: () => Promise<Outfit[]>;

}

