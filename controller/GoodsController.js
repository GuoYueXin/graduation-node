const Response = require("../common/response/Response");
const {
  addGoodService
} = require('../service/GoodService');


const addGoods = async (ctx, next) => {
  const postData = ctx.request.body;
  const {
    goodsName,
    goodsPrice,
    goodsType,
    userId,
    goodsDesc,
    goodsPic
  } = postData;
  const result = await addGoodService(goodsName, goodsPrice, goodsType, userId, goodsDesc, goodsPic)
    .then(result => result)
    .catch(err => {
      console.log('addGoods Controller err', err);
    });
  if (result && result.hasOwnProperty('dataValues')) {
    ctx.response.body = new Response("200", "SUCCESS", null);
  } else {
    ctx.response.body = new Response("500", "ERROR", "发布失败");
  }
}

module.exports = {
  "POST /goods/addGoods": addGoods,
}