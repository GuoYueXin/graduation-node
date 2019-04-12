// import dbUtil from './DBUtil';
const User = require('./modal/userModal');

const userLogin = async (username = '', password = '') => {
  const result = await User.findAll({
    where: {
      username,
      password,
    }
  }).then(result => {
    return result.length > 0 ? result : [];
  }).catch(e => {
    console.log('error', e)
  });
  return result;
}

module.exports = {
  userLogin,
}