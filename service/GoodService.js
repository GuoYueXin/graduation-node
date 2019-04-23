const {
  addGoods,
  query,
} = require('../dao/GoodDao');

const addGoodService = async (goodsName, goodsPrice, goodsType, userId, goodsDesc, goodsPic) => {
  const result = addGoods(goodsName, goodsPrice, goodsType, userId, goodsDesc, goodsPic)
    .then(result => result)
    .catch(err => {
      console.log(err);
    })
  return result;
}

const queryGoodService = async (pageSize, current, keyWords) => {
  const result = query(pageSize, current, keyWords)
    .then(result => result)
    .catch(err => {
      console.log(err);
    });
  return result;
}

module.exports = {
  addGoodService,
  queryGoodService,
}