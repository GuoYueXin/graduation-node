const Response = require("../common/response/Response");
const {
  addGoodService,
  queryGoodService,
  updateGoodStatus,
} = require('../service/GoodService');


const addGoods = async (ctx, next) => {
  const postData = ctx.request.body;
  const {
    goodsName,
    goodsPrice,
    goodsType,
    userId,
    goodsDesc,
    goodsPic,
    goodsNum,
  } = postData;
  const result = await addGoodService(goodsName, goodsPrice, goodsType, userId, goodsDesc, goodsPic, goodsNum)
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

const queryGoods = async (ctx, next) => {
  const queryData = ctx.request.query;
  const { pageSize, current, keyWords = '' } = queryData;
  const result = await queryGoodService(pageSize, current, keyWords)
    .then(result => {
      const goodMap = result.length > 0 ? result.map(item => item.dataValues) : [];
      return goodMap;
    })
    .catch(err => {
      console.log(err);
  })
  if (result) {
    ctx.response.body = new Response("200", "SUCCESS", result);
  } else {
    ctx.response.body = new Response("500", "ERROR", null);
  }
}

// 修改商品状态
const updateStatus = async (ctx, next) => {
  const postData = ctx.request.body;
  const { goodsId, status } = postData;
  const result = await updateGoodStatus(goodsId, status);
  if (result) {
    ctx.response.body = new Response("200", "SUCCESS", null);
  } else {
    ctx.response.body = new Response("500", "ERROR", null);
  }
}

module.exports = {
  "POST /goods/addGoods": addGoods,
  "GET /goods/queryGoods": queryGoods,
  "POST /goods/updateStatus": updateStatus,
}
