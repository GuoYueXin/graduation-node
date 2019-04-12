const sequelize =  require('sequelize');
const db = require('../DBUtil');

const User = db.define('user', {
  username: sequelize.STRING,
  password: sequelize.STRING,
  phoneNumber: sequelize.STRING,
  userId: sequelize.STRING,
  userIcon: sequelize.STRING,
  school: sequelize.STRING,
  address: sequelize.TEXT,
  QQ: sequelize.STRING,
},
{
  timestamps: false,
});

module.exports = User;