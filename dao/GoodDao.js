const Good = require('./modal/goodModal');
const uid = require("uid");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// 添加商品
const addGoods = async (goodsName, goodsPrice, goodsType, userId, goodsDesc, goodsPic) => {
  const goodsId = uid(8) + uid(8) + uid(8);
  const result = Good.create({
    goodsId,
    goodsName,
    goodsPrice,
    goodsType,
    userId,
    goodsDesc,
    goodsPic,
    goodsStatus: 1,
  }).then(result => result).catch(err => {
    console.log(err);
  });
  return result;
}

// 查询商品
const query = async (pageSize, current, keyWords = '') => {
  const result = Good.findAll({
    limit: +pageSize,
    offset: (current - 1) * pageSize,
    where: {
      goodsName: {
        [Op.like]: `%${keyWords}`,
      }
    }
  }).then(result => result)
    .catch(err => {
      console.log('Goods Dao query err:', err);
    });
  return result;
}


module.exports = {
  addGoods,
  query,
}