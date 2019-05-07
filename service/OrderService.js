const {
  add,
} = require('../dao/OrderDao');

const addService = async (goodsId, userId, num) => {
  const result = await add(goodsId, userId, num)
    .then(res => res)
    .catch(err => {
      console.log(err)
    });
  return result;
}

module.exports = {
  addService,
}