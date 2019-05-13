const {
  query,
  updateStatus,
} = require('../dao/MessageDao');
const Response = require('../common/response/Response');

const queryMessage = async (ctx, next) => {
  const queryData = ctx.request.query;
  const { userId } = queryData;
  const result = await query(userId)
    .then(res => res)
    .catch(err => {
      console.log(err)
    })
  if (result) {
     ctx.response.body = new Response("200", "SUCCESS", result)
  } else {
    ctx.response.body = new Response("200", "SUCCESS", []);
  }
}

const update = async (ctx, next) => {
  const queryData = ctx.request.query;
  const { messageId } = queryData;
  const result = await updateStatus(messageId)
    .then(res => res)
    .catch(err => {
      console.log(err)
    })
  if (result) {
    ctx.response.body = new Response("200", "SUCCESS", null)
  } else {
    ctx.response.body = new Response("500", "查询订单消息出错", null);
  }
}

module.exports = {
  "GET /message/query": queryMessage,
  "GET /message/update": update
}