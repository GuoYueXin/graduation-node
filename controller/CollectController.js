const {
  addService,
  queryByGoodsIdAndUserIdService,
  cancelCollectService,
  queryByUserIdService,
} = require('../service/CollectService');
const {
  queryDetial,
} = require('../service/GoodService');
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
      ctx.response.body = new Response("500", "收藏失败", null);
    }
  } else {
    ctx.response.body = new Response("501", "该商品已经在收藏夹中", null);
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
  if (queryRes === 1) {
    ctx.response.body = new Response("200", "SUCCESS", null);
  } else {
    ctx.response.body = new Response("500", "取消收藏失败", null);
  }
}

// 查询用户所收藏的商品
const queryByUserId = async (ctx, next) => {
  const queryData = ctx.request.query;
  const { userId } = queryData;
  const result = await queryByUserIdService(userId)
    .then(res => {
      const arr = res.map(item => item.dataValues);
      return arr;
    })
    .catch(err => {
      console.log(err);
    });
  if (result.length > 0) {
    ctx.response.body = new Response("200", "SUCCESS", result);
  } else {
    ctx.response.body = new Response("500", "查询失败", null);
  }
}

module.exports = {
  "POST /collect/add": add,
  "POST /collect/queryIsCollect": queryIsCollect,
  "POST /collect/cancel": cancelCollect,
  "GET /collect/query": queryByUserId,
}