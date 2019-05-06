const sequelize =  require('sequelize');
const db = require('../DBUtil');

const Collect = db.define('collects', {
    goodsId: sequelize.STRING,
    userId: sequelize.STRING,
  },
  {
    timestamps: false,
  });

module.exports = Collect;