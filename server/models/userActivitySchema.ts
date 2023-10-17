import { Attribute, PrimaryKey, NotNull, Default} from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';

export class UserActivity extends Model<InferAttributes<UserActivity>, InferCreationAttributes<UserActivity>> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare type: 'NewItemToCloset' | 'NewOutfitToCloset' | 'NewCloset'; 

  @Attribute(DataTypes.UUID)
  @NotNull
  declare userId: string;

  @Attribute(DataTypes.UUID)
  declare itemId?: string;

  @Attribute(DataTypes.UUID)
  declare outfitId?: string;

  @Attribute(DataTypes.UUID)
  declare closetId?: string;

  @Attribute(DataTypes.DATE)
  @NotNull
  declare timestamp: Date;

}