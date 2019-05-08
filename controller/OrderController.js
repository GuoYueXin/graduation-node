const {
  addService,
  queryBuyOrderService,
  querySellOrderService,
  updateOrderStatusService,
  deleteOrderService,
} = require('../service/OrderService');
const Response = require('../common/response/Response');

// 生成订单
const add = async (ctx, next) => {
  const postData = ctx.request.body;
  const { goodsId, userId, num, sellUserId, goodsName, goodsPrice, userPhone } = postData;
  const result = await addService(goodsId, userId, num, sellUserId, goodsName, goodsPrice, userPhone)
    .then(res => res)
    .catch(err => {
      console.log(err);
    });
  if (result.hasOwnProperty('dataValues')) {
    ctx.response.body = new Response("200", "SUCCESS", null);
  } else {
    ctx.response.body = new Response("500", "下单失败", null);
  }
}

// 查询购买订单
const queryBuyOrder = async (ctx, next) => {
  const queryData = ctx.request.query;
  const { userId } = queryData;
  const result = await queryBuyOrderService(userId)
    .then(res => res)
    .catch(err => {
      console.log(err);
    })
  ctx.response.body = new Response("200", "SUCCESS", result);
}

// 查询卖出订单
const querySellOrder = async (ctx, next) => {
  const queryData = ctx.request.query;
  const { userId } = queryData;
  const result = await querySellOrderService(userId)
    .then(res => res)
    .catch(err => {
      console.log(err);
    })
  ctx.response.body = new Response("200", "SUCCESS", result);
}

// 修改订单状态
const updateStatus = async (ctx, next) => {
  const postData = ctx.request.body;
  const { orderId, buyStatus = undefined, sellStatus = undefined } = postData;
  const result = await updateOrderStatusService(orderId, buyStatus, sellStatus)
    .then(res => res)
    .catch(err => {
      console.log(err);
    })
  if (result) {
    ctx.response.body = new Response("200", "SUCCESS", null);
  } else {
    ctx.response.body = new Response("500", "订单不存在", null);
  }
}

// 删除订单
const deleteOrder = async (ctx, next) => {
  const queryData = ctx.request.query;
  const { orderId, buyDelFlag = undefined, sellDelFlag = undefined } = queryData;
  const result = await deleteOrderService(orderId, +buyDelFlag, +sellDelFlag)
    .then(res => res)
    .catch(err => {
      console.log(err);
    })
  if (result) {
    ctx.response.body = new Response("200", "SUCCESS", null);
  } else {
    ctx.response.body = new Response("500", "订单删除失败", null);
  }
}

module.exports = {
  "POST /order/add": add,
  "GET /order/queryBuyOrder": queryBuyOrder,
  "GET /order/querySellOrder": querySellOrder,
  "POST /order/updateStatus": updateStatus,
  "GET /order/delete": deleteOrder,
}