import { Attribute, PrimaryKey, NotNull, Default } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, } from '@sequelize/core';


export class FavoriteItem extends Model<InferAttributes<FavoriteItem>, InferCreationAttributes<FavoriteItem>> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  declare id: CreationOptional<string>;
  
  @Attribute(DataTypes.UUID)
  @NotNull
  declare userId: string;

  @Attribute(DataTypes.UUID)
  @NotNull
  declare itemId: string;

}



