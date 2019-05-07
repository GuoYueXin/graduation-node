const {
  addGoods,
  query,
  updateStatus,
  queryTotal,
  queryGoodsDetial,
  queryByUserId,
  updateGoodsNum,
} = require('../dao/GoodDao');

// 添加商品
const addGoodService = async (goodsName, goodsPrice, goodsType, userId, goodsDesc, goodsPic, goodsNum) => {
  const result = await addGoods(goodsName, goodsPrice, goodsType, userId, goodsDesc, goodsPic, goodsNum)
    .then(result => result)
    .catch(err => {
      console.log(err);
    })
  return result;
}

// 查询商品
const queryGoodService = async (pageSize, current, keyWords, goodsType) => {
  const result = await query(pageSize, current, keyWords, goodsType)
    .then(result => result)
    .catch(err => {
      console.log(err);
    });
  return result;
}

// 查询商品总数
const queryGoodTotal = async  (goodsType) => {
  const result = await queryTotal(goodsType)
    .then(result => result)
    .catch(err => {
      console.log(err);
    });
  return result;
}

// 修改商品状态
const updateGoodStatus = async (goodsId, status) => {
  const result = await updateStatus(goodsId, status)
    .then(result => result)
    .catch(err => {
      console.log(err);
    });
  return result;
}

// 查询商品详情
const queryDetial = async (goodsId) => {
  const result = await queryGoodsDetial(goodsId)
    .then(result => result)
    .catch(err => {
      console.log('GoodService queryDetial ERROR:', err);
    });
  return result;
}

// 根据userId查询商品
const queryByUserIdService = async (userId) => {
  const result = await queryByUserId(userId)
    .then(result => result)
    .catch(err => {
      console.log('GoodService queryDetial ERROR:', err);
    });
  return result;
}

// 商品补货
const updateGoodsNumService = async (goodsId, num)=> {
  const result = await updateGoodsNum(goodsId, num)
    .then(res =>res)
    .catch(err => {
      console.log(err)
    })
  return result;
}

module.exports = {
  addGoodService,
  queryGoodService,
  updateGoodStatus,
  queryGoodTotal,
  queryDetial,
  queryByUserIdService,
  updateGoodsNumService,
}
