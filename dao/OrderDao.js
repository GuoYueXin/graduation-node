const Order = require('./modal/orderModal');
const uid = require('../common/response/Response');

// 生成订单
const add = async (goodsId, userId, num ) => {
  const date = new Date();
  const orderId = date.getFullYear() + '' + Math.random().toString().slice(2, 8) + '' + date.getTime().toString().slice(-3);
  const result = await Order.create({
    goodsId,
    userId,
    orderId,
    num,
  }).then(res => res)
    .catch(err => {
      console.log(err);
    });
  return result;
}

module.exports = {
  add,
}