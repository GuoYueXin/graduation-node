const https = require('https');
const fetch = require('node-fetch');
const CryptoJS = require("crypto-js");
const moment = require('moment');
const md5 = require('js-md5');
const ACCOUNT_SID = "8a216da86a11475b016a1198f5800023";
const AUTH_TOKEN = "17206a814ef44f33b023b1d38519b0a0";
const REST_URL = "https://app.cloopen.com:8883";
const APPID = "8a216da86a11475b016a1198f5e30029";

const getSigParameter = () => {
    const timeStamp = moment().format('YYYYMMDDhhmmss');
    const message = `${ACCOUNT_SID}${AUTH_TOKEN}${timeStamp}`;
    const encodedMessgae = md5(message);
    return encodedMessgae.toUpperCase();
};

const getAuthorization = () => {
    const str = `${ACCOUNT_SID}:${moment().format('YYYYMMDDhhmmss')}`;
    const wordArray = CryptoJS.enc.Utf8.parse(str);
    const encodedMessgae = CryptoJS.enc.Base64.stringify(wordArray);
    return encodedMessgae;
};

const getUrl = () => {
    const SigParameter = getSigParameter();
    return `${REST_URL}/2013-12-26/Accounts/${ACCOUNT_SID}/SMS/TemplateSMS?sig=${SigParameter}`;
}

const post = (phoneNumber, code) => {
    const url = getUrl();
    const authorization = getAuthorization();

    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8;',
            'Content-Length': 256,
            Authorization: authorization,
        },
        body: JSON.stringify({
            to: phoneNumber.toString(),
            appId: APPID,
            templateId: '1',
            datas: [code, 5],
        }),
    }).then(res => console.log(res)).catch(e => console.log(e))
}

module.exports = post;