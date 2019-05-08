const sequelize =  require('sequelize');
const db = require('../DBUtil');

const Order = db.define('order', {
    goodsId: sequelize.STRING,
    goodsName: sequelize.STRING,
    goodsPrice: sequelize.FLOAT,
    userId: sequelize.STRING,
    userPhone: sequelize.STRING,
    sellUserId: sequelize.STRING,
    orderId: sequelize.STRING,
    buyStatus: sequelize.INTEGER,
    sellStatus: sequelize.INTEGER,
    buyDelFlag: sequelize.INTEGER,
    sellDelFlag: sequelize.INTEGER,
    num: sequelize.INTEGER,
  },
  {
    timestamps: false,
  });

module.exports = Order;