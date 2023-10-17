import { Attribute, PrimaryKey, NotNull, Default } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional} from '@sequelize/core';


export class FavoriteOutfit extends Model<InferAttributes<FavoriteOutfit>, InferCreationAttributes<FavoriteOutfit>> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  declare id: CreationOptional<string>;
  
  @Attribute(DataTypes.UUID)
  @NotNull
  declare userId: string;

  @Attribute(DataTypes.UUID)
  @NotNull
  declare outfitId: string;

}


