const Order = require('./modal/orderModal');
const Good = require('./modal/goodModal');
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

module.exports = {
  add,
}