const {
  addService,
} = require('../service/OrderService');
const Response = require('../common/response/Response');

const add = async (ctx, next) => {
  const postData = ctx.request.body;
  const { goodsId, userId, num } = postData;
  const result = await addService(goodsId, userId, num)
    .then(res => res)
    .catch(err => {
      console.log(err);
    });
  if (result.hasOwnProperty('dataValues')) {
    ctx.response.body = new Response("200", "SUCCESS", null);
  } else {
    ctx.response.body = new Response("500", "ERROR", null);
  }
}

module.exports = {
  "POST /order/add": add,
}