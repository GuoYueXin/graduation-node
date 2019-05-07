const sequelize =  require('sequelize');
const db = require('../DBUtil');

const Order = db.define('order', {
    goodsId: sequelize.STRING,
    userId: sequelize.STRING,
    orderId: sequelize.STRING,
    buyStatus: sequelize.INTEGER,
    sellStatus: sequelize.INTEGER,
    num: sequelize.INTEGER,
  },
  {
    timestamps: false,
  });

module.exports = Order;