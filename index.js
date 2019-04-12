"use strict";

const Koa = require("koa");

const bodyParser = require("koa-bodyparser");

const controller = require("./controller");

const app = new Koa();

const serve = require("koa-static");

const session = require("koa-session");

console.log("      =j7l7lPvv1sjjjjjjjjjjjjjjjjjjjjjjjjjjjj93v37C}u7ev`     ");
console.log("    =!r=...                                        ...~r==r_  ");
console.log("~_I1=~                                                   ~!3v ");
console.log("3E;           .{(}w}7l5)PoP/}olP}P57fL}5l{sLll1<=          _fr");
console.log("@3.            =vrx!vxxxxxxxvIvvxvvvvxrrIo[MW%hnv          .`<");
console.log("VI.                                  ...~pQDAIxx~            =");
console.log("P=-                              ... rXUHpT3r                ~");
console.log("er~                              'repN#pT_ .                 :");
console.log("cr~                          .;r;=m#H!~~~~                   ~");
console.log("cr~                          `I3mhUZ*;                       ~");
console.log("cr~                       ...`P#Uwxrv~                       ~");
console.log("cr~                       ;r3|%|7v...                        ~");
console.log("cr~                       ryH%fr=;                           ~");
console.log("cr~                   `--_*WW9~.``                           ~");
console.log("cr~                   'rv*W#3x.                              ~");
console.log("er~                   ~rjh%lxv`                              ~");
console.log("fr:                   rrK%Z=__.                              ~");
console.log("br`                   ;7WW~                                  =");
console.log("h3.                   ~X%J_            Node.Koa2             I");
console.log("rTr`                  ~MWp~                                `u!");
console.log(" .rf;_..              ~BM}~                   — gyx    ._x*e.");
console.log("   `~;I=-__.           '~:.   "+ new Date().toLocaleString() +"~~~=3r~   ");
console.log("");
console.log("");
console.log("");
app.keys = ['knove'];
// seesion Config
const CONFIG = {
  key: 'koa:sess77', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));
// log request URL:
app.use(async (ctx, next) => {
  // propertyDir 为 原型 页面。不需要日志记录
  if (ctx.request.method != "GET" || (ctx.request.method == "GET" && ctx.request.url.indexOf(".html") > 0) || (ctx.request.method == "GET" && ctx.request.url.length == 1) ) {
    console.log(`| Process ${ctx.request.method} ${ctx.request.url}... | => ${ctx.session.requestUsername} | Date ${new Date().toLocaleString()} | ${ctx.ip}`);
  }
  // 是否登录的权限控制
  if((ctx.session.requestUsername && ctx.session.requestCheckUser === true  && ctx.session.requestAlterPass === true ) || (ctx.request.url === "/ctrl/checkLogin" || ctx.request.url === "/ctrl?path=checkLogin" || ctx.request.url === "/ctrl?path=alterPass" || ctx.request.url === "/login.html" || (ctx.request.url.indexOf(".html") < 0 && ctx.request.url.indexOf("/ctrl") < 0) ) && ctx.request.url !=="/"){
      await next();
  } else {
      ctx.redirect("/login.html"); // 没有session，快去登录！
  }

});

// parse request body:
app.use(bodyParser());

// add controllers:
app.use(controller());

// static page
app.use(serve(__dirname + "/page"));

app.proxy = true;

app.listen(7777);

console.log("app started at port 7777...");
