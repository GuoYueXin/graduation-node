const Collect = require('./modal/CollectModal');
const Good = require('./modal/goodModal');
const Seqeuelize = require('sequelize');

const Op = Seqeuelize.Op;

// 添加商品收藏
const add = async (goodsId, userId) => {
  const result = await Collect.create({
    goodsId,
    userId,
  }).then(res => res)
    .catch(err => {
      console.log(err);
    })
  return result;
}

// 查询该用户是否已经收藏该商品
const queryByGoodsIdAndUserId = async (goodsId, userId) => {
  const result = await Collect.findOne({
    where: {
      goodsId,
      userId,
    }
  }).then(res => res)
    .catch(err => {
      console.log(err);
    });
  return result;
}

// 取消收藏
const cancelCollect = async (goodsId, userId) => {
  const result = await Collect.destroy({
    where: {
      goodsId,
      userId
    }
  }).then(res => res)
    .catch(err => {
      console.log(err);
    })
  return result;
}

// 查询用户所搜藏的商品
const queryByUserId = async (userId) => {
  const goodsIds = await Collect.findAll({
    attributes: ['goodsId'],
    where: {
      userId,
    },
  }).then(res => {
    const goodIds = res.map(item => item.dataValues.goodsId);
    return goodIds;
  })
    .catch(err => {
      console.log(err)
    });
  const result = await Good.findAll({
    where: {
      goodsId: {[Op.in]: goodsIds}
    }
  }).then(res => res)
    .catch(err => {
      console.log(err)
    });
  return result;
}

module.exports = {
  add,
  queryByGoodsIdAndUserId,
  cancelCollect,
  queryByUserId,
}