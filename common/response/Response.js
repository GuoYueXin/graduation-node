/**
 *   Create by Knove
 *   2018/2/26 17:14:12
 *   Response 返回值的封装
 **/
class Response {
  constructor(status, msg, data) {
    /**
     * 状态
     */
    this.status = status;
    /**
     * 描述信息
     */
    this.msg = msg;
    /**
     * 数据
     */
    this.data = data;
  }
  // get set ... 方法
}
module.exports = Response;
