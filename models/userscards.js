'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersCards = sequelize.define('usersCards', {
    userId: DataTypes.INTEGER,
    cardId: DataTypes.INTEGER,
    counter: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: {
      beforeCreate: function(usersCards, options, fn){
        // this.findById(10571).then(function(userC){
        //   console.log(userC.dataValues);
        // });
        // console.log(this);
        // fn(null,usersCards);
        this.findAndCountAll({
          // where: {
          //   dataValues.userId: 6
          //   //dataValues.cardId: usersCards.id
          // }
        }).then(function(results){
          console.log(results.rows);
          fn(null,usersCards);
        });

      }
    }
  });
  return usersCards;
};