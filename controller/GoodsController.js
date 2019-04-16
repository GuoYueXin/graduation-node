const Response = require("../common/response/Response");
const qiniuToken = require("../common/qiniuUpLoad/index");

const getToken = async (ctx, next) => {
  if (qiniuToken) {
    ctx.response.body = new Response("200", "SUCCESS", qiniuToken);
  } else {
    ctx.response.body = new Response("500", "ERROR", null);
  }
}

module.exports = {
  "GET /goods/getToken": getToken,
}