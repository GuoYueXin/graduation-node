/**
 *   Create by Knove
 *   2018/2/26 15:31:24
 *   User的Controller层
 **/
const {
    getUserById,
    checkUserByInfo,
    getUserAndPower,
    getUserByValue
} = require("../service/UserService");
const { checkUsername } = require("../tools/common");
const Response = require("../common/response/Response");
/**
 *   @Description 根据用户名密码，检测User 进行登录操作
 *
 *   @host /checkUser
 *   @method POST
 *   @param {string} username
 *   @param {string} password
 *   @return {object}
 **/
const checkUser = async (ctx, next) => {
    const postData = ctx.request.body;
    if (!postData.username || !postData.password) {
        ctx.response.body = new Response("ERROR", "信息不符合规范", null);
        return null;
    }
    const requestUsername = postData.username;
    const requestPassword = postData.password;
    console.log("|      |   =>   用户登录,用户名：" + requestUsername);
    await checkUserByInfo(requestUsername, requestPassword).then(userInfo => {
        if (userInfo) {
            console.log("|      |   =>   用户密码验证成功");
            // 将用户信息填入session
            ctx.session.requestUsername = userInfo.username;
            ctx.session.requestUserRealyName = userInfo.realyName;
            ctx.session.requestUserPower = userInfo.power;
            ctx.session.requestEmail = userInfo.email;
            if (
                ctx.ip != "::ffff:124.133.254.90" && // 济南
                ctx.ip != "::ffff:61.49.113.166" && // 北京
                ctx.ip != "::1" // 本机
            ) {
                // 将用户标记为必须校验方可登陆
                if(!ctx.session.requestCheckUser) {
                    console.log(
                        "|      |   =>   用户ip 为" +
                        ctx.ip +
                        ", 外域登录，用户转向验证码页面"
                    );
                    ctx.session.requestCheckUser = false;
                    // 201错误码，前端识别为验证码跳转模式
                    ctx.response.body = new Response("201", "WARN", false);
                    return null;
                }
            }
            if (checkUsername(userInfo.email, requestPassword)) {
                // requestAlterPass 属性： 为false，则无法登录，必须更改密码后，才会变为true
                ctx.session.requestAlterPass = false;
                console.log("|      |   =>   检测到用户密码为初始值，提示必须修改,用户将跳转到更改密码页面");
                // 202错误码，前端识别为提示必须修改
                ctx.response.body = new Response("202", "WARN", false);
                return null;
            }
            // IP校验
            ctx.session.requestCheckUser = true;
            // 用户信息校验
            ctx.session.requestAlterPass = true;
            console.log("|      |   =>   IP校验成功，用户信息校验成功，用户成功登陆");
            ctx.response.body = new Response("200", "SUCCESS", true);

        } else {
            console.log("|      |   =>   用户登录失败");
            ctx.response.body = new Response("200", "SUCCESS", false);
        }
    });
};
/**
 *   @Description 根据Id获取User
 *
 *   @host /queryUserById
 *   @method POST
 *   @param {string} id
 *   @return {object}
 **/
const queryUserById = async (ctx, next) => {
    const postData = ctx.request.body;
    if (!postData.id || postData.id.length < 11 || postData.id.length > 24) {
        ctx.response.body = new Response("300", "id不符合规范", null);
        return null;
    }
    await getUserByValue(postData.id).then(userInfo => {
        ctx.response.body = new Response("200", "SUCCESS", userInfo);
    });
};
/**
 *   @Description 模糊搜索获取User List
 *
 *   @host /getUserByValue
 *   @method POST
 *   @param {string} value
 *   @return list<object>
 **/
const queryUserByValue = async (ctx, next) => {
    const postData = ctx.request.body;
    const value = postData.value;
    if (!value) {
        ctx.response.body = new Response("300", "请求的必要参数为空", null);
        return null;
    }
    await getUserByValue(value).then(userInfo => {
        ctx.response.body = new Response("200", "SUCCESS", userInfo);
    });
};
/**
 *   @Description 根据 session 中储存的用户名获取User
 *
 *   @host /queryUser
 *   @method POST
 *   @return {object}
 **/
const queryUser = async (ctx, next) => {
    const username = ctx.session.requestUsername;
    if (!username) {
        ctx.response.body = new Response("300", "该seesion用户不存在", null);
        return null;
    }
    await getUserAndPower(username).then(userInfo => {
        userInfo.checkUser = ctx.session.requestCheckUser;
        userInfo.alterPass = ctx.session.requestAlterPass;
        ctx.response.body = new Response("200", "SUCCESS", userInfo);
    });
};

const test = async  (ctx, next) => {
    console.log('success', ctx.request.body);
    ctx.response.body = new Response("200", "SUCCESS", true);
}
module.exports = {
    "POST /checkUser": checkUser,
    "POST /queryUserById": queryUserById,
    "POST /queryUser": queryUser,
    "POST /getUserByValue": queryUserByValue,
    "POST /test": test,
};
