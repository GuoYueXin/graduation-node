/**
 *   Create by Knove
 *   2018/2/22 12:34:22
 *   controller 控制 接收请求并转发注册 url-route
 **/

const fs = require("fs");
const Response = require("./common/response/Response");


function addMapping(router, mapping) {
  for (var url in mapping) {
    if (url.startsWith("GET ")) {
      var path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith("POST ")) {
      var path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else if (url.startsWith("PUT ")) {
      var path = url.substring(4);
      router.put(path, mapping[url]);
      console.log(`register URL mapping: PUT ${path}`);
    } else if (url.startsWith("DELETE ")) {
      var path = url.substring(7);
      router.del(path, mapping[url]);
      console.log(`register URL mapping: DELETE ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

function addControllers(router, dir) {
  fs.readdirSync(__dirname + "/" + dir).filter(f => {
    return f.endsWith(".js");
  }).forEach(f => {
    console.log(`process controller: ${f}...`);
    let mapping = require(__dirname + "/" + dir + "/" + f);
    addMapping(router, mapping);
  });
}
function addUploadFile(router) {
  //文件上传
  const multer = require("koa-multer");
  //配置
  var storage = multer.diskStorage({
    //文件保存路径
    destination: function(req, file, cb) {
      cb(null, "./uploads/imgs");
    },
    filename: function(req, file, cb) {
      var fileFormat = file.originalname.split(".");
      cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
  });
  var upload = multer({storage: storage});
  // upload.single('file') file is name<input type="file" name="file"/>
  router.post("/uploadFile", upload.single("file"), async (ctx, next) => {
    // ctx.response.body =
    console.log("接收到上传文件的请求！");
    console.log(ctx.request.body);
    console.log(ctx.req.file)
    if(ctx.req.file){
      ctx.response.status = 201;
      ctx.response.body = new Response("200", "SUCCESS", { filename: ctx.req.file.filename });
      console.log(ctx.response.body);
    }
    // ctx.redirect("/writeFile?name=" + ctx.req.file.filename + "&type=" + ctx.req.body.fileType); // 前往写文件
  });
  console.log(`register URL mapping: POST /uploadFile`);
}
module.exports = function(dir) {
  let controllers_dir = dir || "controller",
    router = require("koa-router")();
  addControllers(router, controllers_dir);
  addUploadFile(router);
  return router.routes();
};
