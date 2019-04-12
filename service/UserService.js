const { userLogin } = require('../dao/UserDao.js');

const loginService = async (username, password) => {
    const result = await userLogin(username, password).then(result => {
      if (result && result.length > 0) {
        return result[0].dataValues;
      } else {
        return null;
      }
    });
    return result;
}

module.exports = {
  loginService,
}