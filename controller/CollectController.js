const {
  addService,
  queryByGoodsIdAndUserIdService,
  cancelCollectService,
} = require('../service/CollectService');
const Response = require('../common/response/Response');

// 添加收藏
const add = async (ctx, next) => {
  const postData = ctx.request.body;
  const {
    goodsId,
    userId,
  } = postData;
  const queryRes = await queryByGoodsIdAndUserIdService(goodsId, userId)
    .then(res => res)
    .catch(err => {
      console.log(err);
    });
  if (!queryRes) {
    const result = await addService(goodsId, userId)
      .then(res => res)
      .catch(err => {
        console.log(err);
      });
    console.log('result', result)
    if (hasOwnProperty.call(result, 'dataValues')) {
      ctx.response.body = new Response("200", "SUCCESS", null);
    } else {
      ctx.response.body = new Response("500", "ERROR", null);
    }
  } else {
    ctx.response.body = new Response("501", "ERROR", "该商品已经在收藏夹中");
  }
}

// 查询是否已经收藏
const queryIsCollect = async (ctx, next) => {
  const postData = ctx.request.body;
  const {
    goodsId,
    userId,
  } = postData;
  const queryRes = await queryByGoodsIdAndUserIdService(goodsId, userId)
    .then(res => res)
    .catch(err => {
      console.log(err);
    });
  if (!queryRes) {
    ctx.response.body = new Response("200", "SUCCESS", 0);
  } else {
    ctx.response.body = new Response("200", "SUCCESS", 1);
  }
}

// 取消商品收藏
const cancelCollect = async (ctx, next) => {
  const postData = ctx.request.body;
  const {
    goodsId,
    userId,
  } = postData;
  const queryRes = await cancelCollectService(goodsId, userId)
    .then(res => res)
    .catch(err => {
      console.log(err);
    });
  console.log(queryRes)
  if (queryRes === 1) {
    ctx.response.body = new Response("200", "SUCCESS", null);
  } else {
    ctx.response.body = new Response("500", "ERROR", null);
  }
}

module.exports = {
  "POST /collect/add": add,
  "POST /collect/queryIsCollect": queryIsCollect,
  "POST /collect/cancel": cancelCollect,
}