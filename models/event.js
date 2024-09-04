'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // Associação entre Event e Subscription
      Event.hasMany(models.Subscription, {
        as: 'subscriptions', // Alias definido aqui
        foreignKey: 'eventId',
      });
    }
  }

  Event.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });

  return Event;
};
