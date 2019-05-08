const Order = require('./modal/orderModal');
const Good = require('./modal/goodModal');
const uid = require('../common/response/Response');

// 生成订单
const add = async (goodsId, userId, num, sellUserId, goodsName, goodsPrice, userPhone ) => {
  const date = new Date();
  const orderId = date.getFullYear() + '' + Math.random().toString().slice(2, 8) + '' + date.getTime().toString().slice(-3);
  const result = await Order.create({
    goodsId,
    goodsName,
    goodsPrice,
    userId,
    sellUserId,
    userPhone,
    orderId,
    num,
  }).then(res => res)
    .catch(err => {
      console.log(err);
    });
  if (result.hasOwnProperty('dataValues')) {
    const goodsNum = await Good.findOne({
      attributes: ['goodsNum'],
      where: {
        goodsId,
      }
    }).then(res => res.dataValues.goodsNum)
      .catch(err => {
        console.log(err)
      });
    const newNum = goodsNum - num;
    await Good.update({ goodsNum: newNum, goodsStatus: newNum > 0 ? 1 : 2 },{
      where: {
        goodsId,
      }
    }).catch(err => {
      console.log(err);
    })
  }
  return result;
}

// 查询购买订单
const queryBuyOrder = async (userId) => {
  const result = await Order.findAll({
    where: {
      userId,
      buyDelFlag: 0,
    }
  }).then(res => res)
    .catch(err => {
      console.log(err)
    })
  return result;
}

// 查询卖出订单
const querySellOrder = async (userId) => {
  const result = await Order.findAll({
    where: {
      sellUserId: userId,
      sellDelFlag: 0,
    }
  }).then(res => res)
    .catch(err => {
      console.log(err)
    })
  return result;
}

// 修改订单状态
const updateOrderStatus = async (orderId, buyStatus, sellStatus) => {
  const newData = {
    buyStatus,
    sellStatus,
  }
  const result = Order.update(newData, {
    where: {
      orderId,
    }
  }).then(res => res)
    .catch(err => {
      console.log(err)
    })
  return result;
}

// 删除订单
const deleteOrder = async (orderId, buyDelFlag, sellDelFlag) => {
  const newDate = buyDelFlag === 1 ? { buyDelFlag } : { sellDelFlag };
  const result = Order.update(newDate, {
    where: {
      orderId,
    }
  }).then(res => res)
    .catch(err => {
      console.log(err)
    })
  return result;
}

module.exports = {
  add,
  queryBuyOrder,
  querySellOrder,
  updateOrderStatus,
  deleteOrder,
}