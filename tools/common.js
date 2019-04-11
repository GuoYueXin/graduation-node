/**
 *   Create by Knove
 *   2018/4/18 10:11:22
 *   程序内用到的公用函数集合
 **/

// 校验UserName  是不是初始值
function checkUsername(email, password){
    return password == "choice."+ /.*?(?=\@)/.exec(email);
}
module.exports = {
    checkUsername };
