import { Attribute, PrimaryKey, NotNull, HasMany, Default, BelongsToMany} from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core';
import { Item } from './itemSchema';
import { Outfit } from './outfitSchema';
import { Closet } from './closetSchema';
import { FavoriteItem } from './favoriteItemSchema';
import { FavoriteOutfit } from './favoriteOutfitSchema';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
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

  @HasMany(() => Closet, 'userId')
  declare closets?: NonAttribute<Closet[]>;

  @HasMany(() => FavoriteItem, 'userId')
  declare favoriteItems?: NonAttribute<FavoriteItem[]>;

  @HasMany(() => FavoriteOutfit, 'userId')
  declare favoriteOutfits?: NonAttribute<FavoriteOutfit[]>;3

  @BelongsToMany(() => User, {
    through: 'userFollows',
    inverse: {
      as: 'following',
    },
  })
  declare followers?: NonAttribute<User[]>;

  @BelongsToMany(() => User, {
    through: 'userFollows',
    inverse: {
      as: 'followers',
    },
  })
  declare following?: NonAttribute<User[]>;

  addFollowing?: (user: User) => Promise<void>;
  removeFollowing?: (user: User) => Promise<void>;

}





