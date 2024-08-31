'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false // NOT NULL
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // NOT NULL
      unique: true // UNIQUE
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false // NOT NULL
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // NOT NULL
      defaultValue: false // valor padrão
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
