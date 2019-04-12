const { loginService } = require('../service/UserService');
const sendMsg = require('../common/sendMsg/sendMsg');
const Response = require("../common/response/Response");

// 用户登录
const login = async (ctx, next) => {
  const postData = ctx.request.body;
  const { username = '', password = '' } = postData;
  const result = await loginService(username, password);
  if (result) {
    ctx.response.body = new Response("200", "SUCCESS", result);
  } else {
    ctx.response.body = new Response("500", "ERROR", "用户名或密码错误");
  }
}

// 发送手机验证码
const sendCode = async (ctx, next) => {
  const postData = ctx.request.body;
  const { phoneNumber } = postData;
  const code = (Math.random() * 1000000).toFixed();
  if (
    ctx.session[phoneNumber] &&
    (ctx.session[phoneNumber][1] - new Date().getTime()) / 1000 > 180
  ) {
    ctx.response.body = new Response("500", "三分钟内只能发送一次短信验证码！", null);
  } else {
    ctx.session[phoneNumber] = [code, new Date().getTime()];
    ctx.session.maxAge = 10 * 60 * 1000;
    sendMsg(phoneNumber, code);
    ctx.response.body = new Response("200", "验证码发送成功", null);
  }
}

// 验证手机验证码
const verifyCode = async (ctx, next) => {
  const postData = ctx.request.body;
  const { authCode } = postData;
  if (ctx.session) {

  }

  ctx.response.body = new Response("200", "SUCCESS", true);
  console.log(postData);
}

module.exports = {
  "POST /user/login": login,
  "POST /user/verifyCode": verifyCode,
}