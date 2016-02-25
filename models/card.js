'use strict';
module.exports = function(sequelize, DataTypes) {
  var card = sequelize.define('card', {
    name: DataTypes.STRING,
    cardId: DataTypes.STRING,
    class: DataTypes.STRING,
    rarity: DataTypes.STRING,
    set: DataTypes.STRING,
    cost: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
         models.card.belongsToMany(models.user,{through: 'usersCards'});
         models.card.belongsToMany(models.deck,{through: 'decksCards'});
       
      }
    }
  });
  return card;
};