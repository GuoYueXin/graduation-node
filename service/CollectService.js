const {
  add,
  queryByGoodsIdAndUserId,
  cancelCollect,
  queryByUserId
} = require('../dao/CollectDao');

// 商品添加收藏
const addService = async (goodsId, userId) => {
  const result = await add(goodsId, userId)
    .then(res => res)
    .catch(err => {
      console.log(err)
    });
  return result;
}

// 查询某用户是否已经收藏了某商品
const queryByGoodsIdAndUserIdService = async (goodsId, userId) => {
  const result = await queryByGoodsIdAndUserId(goodsId, userId)
    .then(res => res)
    .catch(err => {
      console.log(err);
    });
  return result;
}

// 取消收藏
const cancelCollectService = async (goodsId, userId) => {
  const result = await cancelCollect(goodsId, userId)
    .then(res => res)
    .catch(err => {
      console.log(err);
    })
  return result;
}

// 查询用户所收藏商品
const queryByUserIdService = async (userId) => {
  const result = await queryByUserId(userId)
    .then(res => res)
    .catch(err => {
      console.log(err)
    })
  return result;
}

module.exports = {
  addService,
  queryByGoodsIdAndUserIdService,
  cancelCollectService,
  queryByUserIdService,
}