'use strict';
module.exports = function(sequelize, DataTypes) {
  var decksCards = sequelize.define('decksCards', {
    deckId: DataTypes.INTEGER,
    cardId: DataTypes.INTEGER,
    counter: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return decksCards;
};