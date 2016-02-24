'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersDecks = sequelize.define('usersDecks', {
    userId: DataTypes.INTEGER,
    deckId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersDecks;
};