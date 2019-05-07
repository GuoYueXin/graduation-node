const ShopCart = require('./modal/shopCartModal');
const Good = require('./modal/goodModal');
const uid = require('uid');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// 向购物车添加商品
const add = async (goodsId, userId, num) => {
  const result = await ShopCart.create({
    goodsId,
    userId,
    num: +num,
  }).then(result => result)
    .catch(err => {
      console.log('ShopCartDao ERROR:', err);
    });
  return result;
};

// 查询购物车中是否存在该用户的该商品
const queryByGoodsIdAndUserId = async (goodsId, userId) => {
  const result = await ShopCart.findOne({
    where: {
      goodsId,
      userId,
    }
  }).then(res => res)
    .catch(err => {
      console.log('shopCartDao queryByGoodsIdAndUserId error:', err);
    });
  return result;
}

// 修改购物车中商品数量
const updateGoodsNum = async  (goodsId, userId, num) => {
  const result = await ShopCart.update({ num: +num },{
    where: {
      goodsId,
      userId,
    }
  }).then(res => res)
    .catch(err => {
      console.log(err);
    })
  return result;
}

// 根据用户id查询商品列表
const queryByUserId = async (userId) => {
  const goodsIds = await ShopCart.findAll({
    attributes: ['goodsId'],
    where: {
      userId,
    }
  }).then(res => {
    const arr = res.map(item => item.dataValues.goodsId)
    return arr;
  })
    .catch(err => {
      console.log(err)
    })
  const result = await Good.findAll({
    where: {
      goodsId: {[Op.in]: goodsIds}
    }
  })
    .then(res => {
      const arr = res.map(item => item.dataValues);
      return arr;
    })
    .catch(err => {
      console.log(err)
    })
  return result;
}

module.exports = {
  add,
  queryByGoodsIdAndUserId,
  updateGoodsNum,
  queryByUserId,
}