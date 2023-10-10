import { Sequelize, Model, DataTypes } from 'sequelize';

interface UserAttributes {
  username: string;
  password: string;
  email: string;
  profilePicture?: string;
  name?: string;
  surname?: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public username!: string;
  public password!: string;
  public email!: string;
  public profilePicture?: string;
  public name?: string;
  public surname?: string;
}

export default (sequelize: Sequelize) => {
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'Users',
  });
  return User;
};