const {
  add,
  queryByGoodsIdAndUserId,
  updateGoodsNum,
  queryByUserId,
} = require('../dao/ShopCartDao');

// 向购物车添加商品
const addShopCart = async (goodsId, userId, num) => {
  const result = await add(goodsId, userId, num)
    .then(result => result)
    .catch(err => {
      console.log('ShopCartService Error: ', err);
    });
  return result;
}

// 查询购物车中是否有该用户的该商品信息
const queryByGoodsIdAndUserIdService = async (goodsId, userId) => {
  const result = await queryByGoodsIdAndUserId(goodsId, userId)
    .then(res => res)
    .catch(err => {
      console.log('shopCartService queryByGoodsIdAndUserIdService error:', err);
    });
  return result;
}

// 修改购物车中商品数量
const updateGoodsNumService = async (goodsId, userId, num) => {
  const result = await updateGoodsNum(goodsId, userId, num)
    .then(res => res)
    .catch(err => {
      console.log(err);
    })
  return result
}

// 根据userId查询购物车中商品
const queryByUserIdService = async (userId) => {
  const result = await queryByUserId(userId)
    .then(res => res)
    .catch(err => {
      console.log(err);
    })
  return result
}

module.exports = {
  addShopCart,
  queryByGoodsIdAndUserIdService,
  updateGoodsNumService,
  queryByUserIdService,
}