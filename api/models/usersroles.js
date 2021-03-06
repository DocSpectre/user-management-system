'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UsersRoles.hasOne(models.Roles, {
        foreignKey: 'id',
        sourceKey: 'roleId'
      });

      UsersRoles.hasOne(models.Users, {
        foreignKey: 'id',
        sourceKey: 'userId'
      });
    }
  }
  UsersRoles.init({
    userId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsersRoles',
  });
  return UsersRoles;
};