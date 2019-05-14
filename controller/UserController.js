const {
  loginService,
  registerService,
  queryPhoneService,
  updatePwdService,
  updateInfoService,
  queryUserDetial,
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
    ctx.response.body = new Response("500", "用户名或密码错误", null);
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
    ctx.response.body = new Response("500", "注册失败", null);
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
        ctx.response.body = new Response("500", "密码修改失败，请稍后重试", null);
    }
}


// 发送手机验证码
const sendCode = async (ctx, next) => {
  const postData = ctx.request.body;
  const {phoneNumber, type = ''} = postData;
  const code = Math.random().toString().slice(2,8);
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

// 修改用户信息
const updateInfo = async (ctx, next) => {
  const postData = ctx.request.body;
  const {
    userId,
    username,
    userIcon,
    address,
    QQ,
  } = postData;
  const result = await updateInfoService(userId, username, userIcon, address, QQ)
    .then(res => res)
    .catch(err => {
      console.log(err)
    })
  if(result){
    const userInfo = await queryUserDetial(userId)
      .then(res => res)
      .catch(err => {
        console.log(err)
      })
    if (userInfo.hasOwnProperty("dataValues")) {
      ctx.response.body = new Response("200", "SUCCESS", userInfo.dataValues);
    } else {
      ctx.response.body = new Response("500", "获取用户信息出错啦", null);
    }
  } else {
    ctx.response.body = new Response("500", "修改用户信息失败", null);
  }
}

module.exports = {
  "POST /user/login": login,
  "POST /user/sendCode": sendCode,
  "POST /user/verifyCode": verifyCode,
  "POST /user/updatePwd": updatePwd,
  "POST /user/register": userReg,
  "POST /user/updateInfo": updateInfo,
}
