const {
  add,
  queryBuyOrder,
  querySellOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../dao/OrderDao');

// 生成订单
const addService = async (goodsId, userId, num, sellUserId, goodsName, goodsPrice, userPhone) => {
  const result = await add(goodsId, userId, num, sellUserId, goodsName, goodsPrice, userPhone)
    .then(res => res)
    .catch(err => {
      console.log(err)
    });
  return result;
}

// 查询购买订单
const queryBuyOrderService = async (userId) => {
  const result = await queryBuyOrder(userId)
    .then(res => res)
    .catch(err => {
      console.log(err)
    })
  return result
}

// 查询卖出订单
const querySellOrderService = async (userId) => {
  const result = await querySellOrder(userId)
    .then(res => res)
    .catch(err => {
      console.log(err)
    })
  return result
}

// 修改订单状态
const updateOrderStatusService = async (orderId, buyStatus, sellStatus) => {
  const result = await updateOrderStatus(orderId, buyStatus, sellStatus)
    .then(res => res)
    .catch(err => {
      console.log(err)
    })
  return result
}

// 删除订单
const deleteOrderService = async (orderId, buyDelFlag, sellDelFlag) => {
  const result = await deleteOrder(orderId, buyDelFlag, sellDelFlag)
    .then(res => res)
    .catch(err => {
      console.log(err)
    })
  return result
}

module.exports = {
  addService,
  queryBuyOrderService,
  querySellOrderService,
  updateOrderStatusService,
  deleteOrderService,
}