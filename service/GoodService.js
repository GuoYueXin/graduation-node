const {
  addGoods,
  query,
  updateStatus,
  queryTotal,
} = require('../dao/GoodDao');

// 添加商品
const addGoodService = async (goodsName, goodsPrice, goodsType, userId, goodsDesc, goodsPic, goodsNum) => {
  const result = addGoods(goodsName, goodsPrice, goodsType, userId, goodsDesc, goodsPic, goodsNum)
    .then(result => result)
    .catch(err => {
      console.log(err);
    })
  return result;
}

// 查询商品
const queryGoodService = async (pageSize, current, keyWords, goodsType) => {
  const result = query(pageSize, current, keyWords, goodsType)
    .then(result => result)
    .catch(err => {
      console.log(err);
    });
  return result;
}

// 查询商品总数
const queryGoodTotal = async  (goodsType) => {
  const result = queryTotal(goodsType)
    .then(result => result)
    .catch(err => {
      console.log(err);
    });
  return result;
}

// 修改商品状态
const updateGoodStatus = async (goodsId, status) => {
  const result = updateStatus(goodsId, status)
    .then(result => result)
    .catch(err => {
      console.log(err);
    });
  return result;
}

module.exports = {
  addGoodService,
  queryGoodService,
  updateGoodStatus,
  queryGoodTotal,
}
