/**
 *   Create by Knove
 *   2018/2/22 11:23:22
 *   数值相关工具函数集合
 **/
const md5 = require('js-md5');

// 密码加密函数
function encrypt7(str) {
    const confusionStr = md5(str.substring(2,5));
    const encrypt7Str = md5(str+".77."+confusionStr);
    return encrypt7Str;
}
// 计算元素个数
function count(o) {
  var t = typeof o;
  if (t == "string") {
    return o.length;
  } else if (t == "object") {
    var n = 0;
    for (var i in o) {
      n++;
    }
    return n;
  }
  return false;
}
// 获取7位的随机字符
function randomString(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 7; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
// Object数组去重
function unique(array){
    const seen = new Map();
    return array.filter((a) => !seen.has(a) && seen.set(a, 1));
}

// 随机字符创造
function randomChar() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    return s.join("");
}
module.exports = {
    count,
    randomString,
    encrypt7,
    unique,
    randomChar
};
