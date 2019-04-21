const sequelize =  require('sequelize');
const db = require('../DBUtil');

const Good = db.define('good', {
    goodsId: sequelize.STRING,
    goodsName: sequelize.STRING,
    goodsPrice: sequelize.FLOAT,
    userId: sequelize.STRING,
    goodsType: sequelize.INTEGER,
    goodsPic: sequelize.STRING,
    goodsDesc: sequelize.TEXT,
  },
  {
    timestamps: false,
  });

module.exports = Good;