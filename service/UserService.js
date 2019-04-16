const {
  userLogin,
  userRegister,
  queryPhoneNumber,
  updatePwd,
} = require('../dao/UserDao.js');

// 用户登录
const loginService = async (username, password) => {
  const result = await userLogin(username, password)
    .then(result => {
      if (result && result.length > 0) {
        return result[0].dataValues;
      } else {
        return null;
      }
    });
  return result;
}

// 用户注册
const registerService = async (username, passowrd, phoneNumber, school) => {
  const result = await userRegister(username, passowrd, phoneNumber, school)
    .then(result => result)
    .catch(e => {
      consolr.log(e)
    });
  return result;
}

// 查询手机号是否重复
const queryPhoneService = async (phoneNumber) => {
  const result = await queryPhoneNumber(phoneNumber)
    .then(result => {
      if (result && result.length > 0) {
        return result[0].dataValues;
      } else {
        return null;
      }
    })
    .catch(e => {
      console.log(e)
    });
  return result;
}

// 修改密码
const updatePwdService = async (phoneNumber, password) => {
  const result = await updatePwd(phoneNumber, password)
    .then(result => result)
    .catch(e => {
      console.log(e)
    })
  return result;
}


module.exports = {
  loginService,
  registerService,
  queryPhoneService,
  updatePwdService,
}