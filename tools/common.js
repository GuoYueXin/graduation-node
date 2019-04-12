/**
*time:2019/4/12
*auth:gyx
*desc:公共函数库
*/
// 校验UserName  是不是初始值
function checkUsername(email, password){
  return password == "choice."+ /.*?(?=\@)/.exec(email);
}
module.exports = {
  checkUsername
};
