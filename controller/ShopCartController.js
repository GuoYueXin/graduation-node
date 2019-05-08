const {
  addShopCart,
  queryByGoodsIdAndUserIdService,
  updateGoodsNumService,
  queryByUserIdService,
  deleteByUserIdAndGoodsIdService,
} = require('../service/ShopCartService');
const Response = require('../common/response/Response');

// 向购物车中添加商品
const add = async (ctx, next) => {
  const postData = ctx.request.body;
  const { goodsId, userId, num } = postData;
  let result;
  const queryRes = await queryByGoodsIdAndUserIdService(goodsId, userId)
    .then(res => res)
    .catch(err => {
      console.log('queryByGoodsIdAndUserIdService add query error', err);
    });
  if (!queryRes) {
    result = await addShopCart(goodsId, userId, num)
      .then(result =>result)
      .catch(err => {
        console.log('queryByGoodsIdAndUserIdService add error', err);
      });
  } else {
    result = await updateGoodsNumService(goodsId, userId, num + queryRes.dataValues.num)
      .then(res => res)
      .catch(err => {
        console.log(err);
      })
  }
  if (Array.isArray(result) || hasOwnProperty.call(result, 'dataValues')) {
    ctx.response.body = new Response("200", "SUCCESS", null);
  } else {
    ctx.response.body = new Response("500", "添加失败", null);
  }
}

// 根据userId查询购物车中的商品
const queryByUserId = async (ctx, next) => {
  const queryData = ctx.request.query;
  const { userId } = queryData;
  const result = await queryByUserIdService(userId)
    .then(res => res)
    .catch(err => {
      console.log(err);
    })
  ctx.response.body = new Response("200", "SUCCESS", result);
}

// 删除购物车中商品
const deleteByUserIdAndGoodsId = async (ctx, next) => {
  const postData = ctx.request.body;
  const { userId, goodsId } = postData;
  const result = await deleteByUserIdAndGoodsIdService(userId, goodsId)
    .then(res => res)
    .catch(err => {
      console.log(err);
    })
  if (result === 1) {
    ctx.response.body = new Response("200", "SUCCESS", null);
  } else {
    ctx.response.body = new Response("500", "删除失败", null);
  }
}

module.exports = {
  "POST /cart/add": add,
  "GET /cart/query": queryByUserId,
  "POST /cart/delete": deleteByUserIdAndGoodsId,
}