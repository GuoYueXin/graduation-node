/**
 *   Create by Knove
 *   2018/2/22 12:34:22
 *   上传文件 写文件
 **/
const { count } = require("../tools/tally");
const conn = require("../conn");
const fs = require("fs");
const JSZip = require("jszip");

const writeFile = async (ctx, next) => {
  if(!ctx.query["name"] || !ctx.query["type"]){
    ctx.redirect("/error.html"); // 未成功，跳转到错误页面
    return null;
  }
  const proType = ctx.query["type"];
  const uploader = ctx.session.requestUserRealyName; // 操作人
  const power = ctx.session.requestUserPower;
  console.log(power);
  if(power !== "ctrl" && power !== "admin"){ // 权限不足 ，跳转！
    ctx.redirect("/error.html"); // 未成功，跳转到错误页面
    return null;
  }
  // 将要执行的操作集合
  let doMap = {
    version: "1.00",
    doFlag: false
  };
  /**
   * 进行mongoDB查询记录操作
   **/
  // 查询 type 是否存在
  const typeQuery = await conn("pro_type").find({ type_id: parseInt(proType) });
  if (count(typeQuery) === 1) {
    const typeId = typeQuery[0].type_id;
    const prototypeQuery = await conn("prototype").find({ type: typeId });
    let version = "1.00";
    if (count(prototypeQuery) === 0) {
      // 如果发现没有此type的记录，则直接新增一条1.0记录
      await conn("prototype").insert({
        name: typeQuery[0].name,
        uploader: uploader,
        version: version,
        type: typeId,
        date: new Date()
      });
    } else if (count(prototypeQuery) > 0) {
      // 发现有记录，寻找到最后一个版本号，并自增加
      const lastVersionPrototype = await conn("prototype").find(
        { type: typeId },
        { sort: { version: -1 } }
      );
      version = (parseFloat(lastVersionPrototype[0].version) + 0.01).toFixed(2); // 版本号仅为一个小数有效数字
      await conn("prototype").insert({
        name: typeQuery[0].name,
        uploader: uploader,
        version: version,
        type: typeId,
        date: new Date()
      });
    }
    // 装配doMap
    doMap.doFlag = true;
    doMap.sortName = typeQuery[0].name;
    doMap.version = version;
  }
  /**
   *  进行写文件操作
   **/
  if (doMap.doFlag) {
    // 正式开始写文件
    writeFileDo(ctx, next, doMap);
    ctx.redirect("/index.html"); // 成功，跳转到主页
  } else {
    ctx.redirect("/error.html?errorInfo=" + doMap.errorInfo); // 未成功，跳转到错误页面
  }
};
const writeFileDo = async (ctx, next, doMap) => {
  console.log("获取到的doMap:");
  console.log(doMap);
  fs.readFile("uploads/" + ctx.query["name"], function(err, data) {
    console.log("=====>" + ctx.query["name"] + "," + ctx.query["type"]);
    if (err) throw err;
    // 新建目录
    baseUrl = "page/propertyDir/";
    baseUrl += doMap.sortName + "V" + doMap.version + "/";
    if (!fs.existsSync(baseUrl)) {
      fs.mkdirSync(baseUrl);
    }
    JSZip.loadAsync(data).then(function(zip) {
      let date = new Date().getTime();
      // console.log("获得ZIP内目录：");
      // console.log(zip);
      let sum = count(zip.files); // 获取文件数
      console.log("压缩包内文件：" + sum + "个");
      let index = 0; // 当前文件数
      for (let item in zip.files) {
        let fileInfo = zip.files[item];
        zip.files[item].name = item;
        if (
          fileInfo.dir == true &&
          !fs.existsSync(baseUrl + "/" + zip.files[item].name)
        ) {
          fs.mkdirSync(baseUrl + "/" + zip.files[item].name);
          index++;
        }
      }
      // console.log(zip.files);
      for (let item in zip.files) {
        let fileInfo = zip.files[item];
        // 精简->
        if (fileInfo.dir == false) {
          zip
            .file(item)
            .nodeStream()
            .pipe(fs.createWriteStream(baseUrl + "/" + zip.files[item].name))
            .on("finish", function() {
              // JSZip generates a readable stream with a "end" event,
              // but is piped here in a writable stream which emits a "finish" event.
              console.log("====|    写入文件   | => " + item + " |  成功!");
              index++;
              if (sum == index) {
                console.log(
                  "写入完毕，耗时:" + (new Date().getTime() - date) + "ms"
                );
              }
            });
        }
      }
    });
  });
  // 将上传的文件移动到uplpad 暂存
  destPath = "file/" + doMap.sortName + "V" + doMap.version + ".zip";
  fs.rename("uploads/" + ctx.query["name"], destPath, function(err) {
    if (err) throw err;
    fs.stat(destPath, function(err, stats) {
      if (err) throw err;
      console.log("stats: " + JSON.stringify(stats));
    });
  });
};
module.exports = {
  "GET /writeFile": writeFile
};
