'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersCards = sequelize.define('usersCards', {
    userId: DataTypes.INTEGER,
    cardId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersCards;
};