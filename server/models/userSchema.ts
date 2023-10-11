import { Attribute, PrimaryKey, NotNull, HasMany } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core';
import { Item } from './itemSchema';
import { Outfit } from './outfitSchema';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare username: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare password: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare email: string;

  @Attribute(DataTypes.STRING)
  declare profilePicture: string;

  @Attribute(DataTypes.STRING)
  declare name: string;

  @Attribute(DataTypes.STRING)
  declare surname: string;

  @HasMany(() => Item, 'userId')
  declare items?: NonAttribute<Item[]>;

  @HasMany(() => Outfit, 'userId')
  declare outfits?: NonAttribute<Outfit[]>;
}