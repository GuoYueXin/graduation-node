const {
  loginService,
  registerService,
  queryPhoneService,
  updatePwdService,
} = require('../service/UserService');
// const sendMsg = require('../common/sendMsg/sendMsg');
const msgTest = require('../common/sendMsg/msgTest');
const Response = require("../common/response/Response");

// 用户登录
const login = async (ctx, next) => {
  const postData = ctx.request.body;
  const {username = '', password = ''} = postData;
  const result = await loginService(username, password);
  if (result) {
    ctx.response.body = new Response("200", "SUCCESS", result);
  } else {
    ctx.response.body = new Response("500", "ERROR", "用户名或密码错误");
  }
}

// 用户注册
const userReg = async (ctx, next) => {
  const postData = ctx.request.body;
  const {username, password, phoneNumber, school} = postData;
  const result = await registerService(username, password, phoneNumber, school);
  if (result && result.hasOwnProperty('dataValues')) {
    ctx.response.body = new Response("200", "SUCCESS", null);
  } else {
    ctx.response.body = new Response("500", "ERROR", "注册失败");
  }
}

// 用户修改密码
const updatePwd = async (ctx, next) => {
    const postData = ctx.request.body;
    const {phoneNumber, password} = postData;
    const result = await updatePwdService(phoneNumber, password);
    if (result) {
        ctx.response.body = new Response("200", "SUCCESS", null);
    } else {
        ctx.response.body = new Response("500", "ERROR", null);
    }
}


// 发送手机验证码
const sendCode = async (ctx, next) => {
  const postData = ctx.request.body;
  const {phoneNumber, type = ''} = postData;
  const code = (Math.random() * 1000000).toFixed();
  if (!type) {
    const result = await queryPhoneService(phoneNumber)
      .then(result => result)
      .catch(e => {
        console.log(e)
      })
    if (result) {
      console.log(result)
      ctx.response.body = new Response("501", "该手机号已被注册", null);
      return null;
    }
  }
  if (
    ctx.session[phoneNumber] &&
    (ctx.session[phoneNumber][1] - new Date().getTime()) / 1000 > 60
  ) {
    ctx.response.body = new Response("500", "一分钟内只能发送一次短信验证码！", null);
  } else {
    ctx.session[phoneNumber] = [code, new Date().getTime()];
    ctx.session.maxAge = 10 * 60 * 1000;
    msgTest(phoneNumber, code);
    ctx.response.body = new Response("200", "验证码发送成功", null);
  }
}

// 验证手机验证码
const verifyCode = async (ctx, next) => {
  const postData = ctx.request.body;
  const {authCode, phoneNumber} = postData;
  if (
    ctx.session[phoneNumber] &&
    ctx.session[phoneNumber][0] === authCode
  ) {
    ctx.session[phoneNumber] = '';
    ctx.response.body = new Response("200", "SUCCESS", null);
  } else {
    ctx.response.body = new Response("500", "验证码错误", null);
  }
}

module.exports = {
  "POST /user/login": login,
  "POST /user/sendCode": sendCode,
  "POST /user/verifyCode": verifyCode,
  "POST /user/updatePwd": updatePwd,
  "POST /user/register": userReg,
}
