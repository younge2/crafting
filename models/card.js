'use strict';
module.exports = function(sequelize, DataTypes) {
  var card = sequelize.define('card', {
    name: DataTypes.STRING,
    cardId: DataTypes.STRING,
    class: DataTypes.STRING,
    rarity: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return card;
};