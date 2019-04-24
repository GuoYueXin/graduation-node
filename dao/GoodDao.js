const Good = require('./modal/goodModal');
const uid = require("uid");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// 添加商品
const addGoods = async (goodsName, goodsPrice, goodsType, userId, goodsDesc, goodsPic, goodsNum) => {
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
    goodsNum,
  }).then(result => result).catch(err => {
    console.log(err);
  });
  return result;
}

// 查询商品
const query = async (pageSize = 10, current = 1, keyWords = '') => {
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

// 修改商品状态
const updateStatus = async (goodsId, status) => {
  const result = Good.update({goodsStatus: +status},{
    where: {
      goodsId,
    }
    })
    .then(result => result)
    .catch(err => {
      console.log('GoodDao error at line 51:', err);
    });
  return result;
}

module.exports = {
  addGoods,
  query,
  updateStatus,
}
