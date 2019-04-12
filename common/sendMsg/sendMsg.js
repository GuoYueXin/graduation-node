var https = require('https');
const qs = require('querystring');

const { APIKEY, SMS_HOST, SEND_SMS_URL } = require('./msgConfig');

const sendMsg = async (phoneNumber, authCode) => {
  const text = `【前端笔记分享】您的验证码是${authCode}。如非本人操作，请忽略本短信`;
  const post_data = {
    'apikey': APIKEY,
    'mobile': phoneNumber,
    text,
  }
  const content = qs.stringify(post_data);
  post(SEND_SMS_URL, content, SMS_HOST);
}

const post = (uri,content,host) => {
  const options = {
    hostname: host,
    port: 443,
    path: uri,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  };
  const req = https.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });
  console.log(content);
  req.write(content);
  req.end();
}

module.exports = sendMsg;