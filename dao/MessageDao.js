const Message = require('./modal/messageModal');
const Order = require('./modal/orderModal');

const query = async (userId) => {
  const message = await Message.findOne({
    where: {
      userId,
      isRead: 0,
    }
  }).then(res => res)
    .catch(err => {
      console.log(err)
    });
  // 查询订单信息
  if (message && message.hasOwnProperty("dataValues")) {
    const orderId = message.dataValues.orderId;
    const order = await Order.findOne({
      where: {
        orderId,
      }
    }).then(res => res)
      .catch(err => {
        console.log(err)
      });
    if (order.hasOwnProperty("dataValues")) {
       return Object.assign(order.dataValues, message.dataValues)
    }
  } else {
    return null
  }
}

const updateStatus = async (messageId) => {
  const result = await Message.update({ isRead: 1},{
    where: {
      messageId,
    }
  }).then(res => res)
    .catch(err => {
      console.log(err);
    })
  return result;
}

module.exports = {
  query,
  updateStatus,
}