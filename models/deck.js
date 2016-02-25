'use strict';
module.exports = function(sequelize, DataTypes) {
  var deck = sequelize.define('deck', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.deck.belongsToMany(models.user,{through: 'usersDecks'});
        models.deck.belongsToMany(models.card,{through: 'decksCards'});
       
      }
    }
  });
  return deck;
};