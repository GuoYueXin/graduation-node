const Good = require('./modal/goodModal');
const uid = require("uid");

// 添加商品
const addGoods = async (goodsName, goodsPrice, goodsType, userId, goodsDesc, goodsPic) => {
  const goodsId = uid(8) + uid(8) + uid(8);
  const result = Good.create({
    goodsId,
    goodsName,
    goodsPrice,
    goodsType,
    userId,
    goodsDesc,
    goodsPic,
  }).then(result => result).catch(err => {
    console.log(err);
  });
  return result;
}

module.exports = {
  addGoods,
}