const Response = require("../common/response/Response");
const multer = require('multer');

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "../Images");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage: Storage }).array("imgUploader", 3);

const uploadPic = async (ctx, next) => {
  upload(ctx.request, ctx.response, function (err) {
    // if (err) {
    //   return res.end("Something went wrong!");
    // }
    // return res.end("File uploaded sucessfully!.");
  });
}

module.exports = {
  // "GET /goods/getToken": getToken,
  "POST /goods/uploadPic": uploadPic,
}