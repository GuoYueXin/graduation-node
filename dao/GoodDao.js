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
const query = async (pageSize = 10, current = 1, keyWords = '', goodsType = 0) => {
  const result = Good.findAll({
    limit: +pageSize,
    offset: (current - 1) * pageSize,
    where: {
      goodsName: {
        [Op.like]: `%${keyWords}%`,
      },
      goodsType: +goodsType === 0 ? { [Op.in]: [1, 2, 3] } : {  [Op.eq]: +goodsType },
    }
  }).then(result => result)
    .catch(err => {
      console.log('Goods Dao query err:', err);
    });
  return result;
}

// 查询商品总数
const queryTotal = async (goodsType = 0) => {
 const res = await Good.findAll({
   where: {
     goodsType: +goodsType === 0 ? { [Op.in]: [1, 2, 3] } : {  [Op.eq]: +goodsType },
   },
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'count']]
  }).then(res => res).catch(err => console.log(err));
 return res
}

// 根据商品Id查询商品详情
const queryGoodsDetial = async (goodsId) => {
  const res = await Good.findOne({
    where: {
      goodsId,
    }
  })
    .then(res => res)
    .catch(err => {
      console.log('GoodDao queryGoodsDetial ERROR:', err);
    })
  return res;
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
  queryTotal,
  queryGoodsDetial,
}
