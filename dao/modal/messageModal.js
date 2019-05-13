const sequelize =  require('sequelize');
const db = require('../DBUtil');

const Message = db.define('messages', {
    messageId: sequelize.STRING,
    orderId: sequelize.STRING,
    userId: sequelize.STRING,
    isRead: sequelize.INTEGER,
    type: sequelize.STRING,
  },
  {
    timestamps: false,
  });

module.exports = Message;