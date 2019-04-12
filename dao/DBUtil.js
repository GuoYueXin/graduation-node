
const Sequelize = require('sequelize');

const sequelize = new Sequelize('school_idleFish', 'root', '123456', {
  host: '47.100.221.215',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

module.exports = sequelize;