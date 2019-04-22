const {
  addGoods,
} = require('../dao/GoodDao');

const addGoodService = async (goodsName, goodsPrice, goodsType, userId, goodsDesc, goodsPic) => {
  const result = addGoods(goodsName, goodsPrice, goodsType, userId, goodsDesc, goodsPic)
    .then(result => result)
    .catch(err => {
      console.log(err);
    })
  return result;
}

module.exports = {
  addGoodService,
}