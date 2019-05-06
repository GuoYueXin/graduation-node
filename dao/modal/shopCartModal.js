const sequelize =  require('sequelize');
const db = require('../DBUtil');

const ShopCart = db.define('shopCart', {
    goodsId: sequelize.STRING,
    userId: sequelize.STRING,
    num: sequelize.INTEGER,
  },
  {
    timestamps: false,
  });

module.exports = ShopCart;