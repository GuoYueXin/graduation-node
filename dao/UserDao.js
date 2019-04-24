// import dbUtil from './DBUtil';
const User = require('./modal/userModal');
const uid = require("uid");

// 用户登录
const userLogin = async (username = '', password = '') => {
  const result = await User.findAll({
    where: {
      phoneNumber: username,
      password,
    }
  }).then(result => {
    return result.length > 0 ? result : [];
  }).catch(e => {
    console.log('error', e)
  });
  return result;
}


// 用户注册
const userRegister = async (username, password, phoneNumber, school) => {
  const userId = uid(8) + uid(8);
  const result = await User.create({
    username,
    password,
    phoneNumber,
    school,
    userId,
  }).then(result => result).catch(e => {
    console.log(e)
  })
  return result;
}

// 查询手机号是否重复
const queryPhoneNumber = async (phoneNumber) => {
  const result = await User.findOne({
    where: {
      phoneNumber,
    }
  }).then(result => result)
    .catch(e => {
      console.log(e)
    });
  return result;
}

// 修改密码
const updatePwd = async (phoneNumber, password) => {
  const result = await User.update({password}, {
    where: {
      phoneNumber,
    }
  }).then(result => result)
    .catch(e => {
      console.log(e)
    })
  return result;
}

module.exports = {
  userLogin,
  userRegister,
  queryPhoneNumber,
  updatePwd,
}
