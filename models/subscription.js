'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    static associate(models) {
      // Associação com Event
      Subscription.belongsTo(models.Event, {
        as: 'event', // Alias para Event
        foreignKey: 'eventId',
      });

      // Associação com User
      Subscription.belongsTo(models.User, {
        as: 'User', // Alias para User
        foreignKey: 'userId',
      });
    }
  }

  Subscription.init({
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subscription',
  });

  return Subscription;
};
