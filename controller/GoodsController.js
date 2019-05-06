const Response = require("../common/response/Response");
const {
  addGoodService,
  queryGoodService,
  updateGoodStatus,
  queryGoodTotal,
  queryDetial,
} = require('../service/GoodService');
const {
  queryUserDetial
} = require('../service/UserService');

// 发布商品
const addGoods = async (ctx, next) => {
  const postData = ctx.request.body;
  const {
    goodsName,
    goodsPrice,
    goodsType,
    userId,
    goodsDesc,
    goodsPic,
    goodsNum,
  } = postData;
  const result = await addGoodService(goodsName, goodsPrice, goodsType, userId, goodsDesc, goodsPic, goodsNum)
    .then(result => result)
    .catch(err => {
      console.log('addGoods Controller err', err);
    });
  if (result && result.hasOwnProperty('dataValues')) {
    ctx.response.body = new Response("200", "SUCCESS", null);
  } else {
    ctx.response.body = new Response("500", "ERROR", "发布失败");
  }
}

// 查询商品列表
const queryGoods = async (ctx, next) => {
  const queryData = ctx.request.query;
  const { pageSize = 12, current = 1, keyWords = '', goodsType = 0 } = queryData;
  const result = await queryGoodService(pageSize, current, keyWords, goodsType)
    .then(result => {
      const goodMap = result.length > 0 ? result.map(item => item.dataValues) : [];
      return goodMap;
    })
    .catch(err => {
      console.log(err);
  });
  const total = await queryGoodTotal(goodsType).then(result => result[0].dataValues.count).catch(err => {
    console.log(err);
  });
  const data = {
    data: result,
    total: total,
    pageSize: +pageSize,
    current: +current,
  }

  if (result) {
    console.log(data);
    ctx.response.body = new Response("200", "SUCCESS", data);
  } else {
    ctx.response.body = new Response("500", "ERROR", null);
  }
}

// 修改商品状态
const updateStatus = async (ctx, next) => {
  const postData = ctx.request.body;
  const { goodsId, status } = postData;
  const result = await updateGoodStatus(goodsId, status);
  if (result) {
    ctx.response.body = new Response("200", "SUCCESS", null);
  } else {
    ctx.response.body = new Response("500", "ERROR", null);
  }
}

// 查询商品详情
const queryGoodsDetial = async (ctx, next) => {
  const { goodsId } = ctx.request.query;
  const result = await queryDetial(goodsId)
    .then(async result => {
      if (hasOwnProperty.call(result, 'dataValues')) {
        const data = result.dataValues;
        const userInfo = await queryUserDetial(data.userId)
          .then(result => {
            if (hasOwnProperty.call(result, 'dataValues')) {
              return result.dataValues;
            } else {
              return null;
            }
          })
          .catch(err => {
            console.log('query user info error:', err);
          })
        const res = {
          goodInfo: result,
          userInfo,
        }
        return res;
      } else {
        return null;
      }
    })
    .catch(err => {
      console.log('GoodsController queryGoodsDetial ERROR:', err);
    })
  if (result) {
    ctx.response.body = new Response("200", "SUCCESS", result);
  } else {
    ctx.response.body = new Response("500", "ERROR", null);
  }

}

module.exports = {
  "POST /goods/addGoods": addGoods,
  "GET /goods/queryGoods": queryGoods,
  "POST /goods/updateStatus": updateStatus,
  "GET /goods/queryGoodsDetial": queryGoodsDetial,
}
