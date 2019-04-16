const qiniu = require('qiniu');

const AK = 'mQw6UJHD4TZ_RcBdKFPU6UUuMUpDxMK7hPWHo9gH';
const SK = 'LSuiuuOPlLQN3H4Zg6ISv798HU9iTmO6UaixatT3';
const BUCKET = 'school-mall';

const mac = new qiniu.auth.digest.Mac(AK, SK);
const options = {
  scope: BUCKET,
  expires: 3600 * 24
};
const putPolicy =  new qiniu.rs.PutPolicy(options);
const uploadToken= putPolicy.uploadToken(mac);

module.exports =  uploadToken;