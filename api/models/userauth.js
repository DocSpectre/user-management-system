'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAuth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserAuth.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    session_key: DataTypes.STRING,
    session_status: DataTypes.STRING,
    session_expire: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserAuth',
  });
  return UserAuth;
};