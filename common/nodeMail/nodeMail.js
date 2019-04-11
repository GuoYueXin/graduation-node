/**
 *
 * @Description 邮件发送
 * @调用方法 sendMail('308346293@qq.com','这是测试邮件', 'Hi Knove,这是一封测试邮件');
 * @Author Knove
 * @Created 2018/04/17 11:19
 *
 */

var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('./mailConfig')

smtpTransport = nodemailer.createTransport(smtpTransport({
    host: config.email.host,
    port: config.email.port,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
}));

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
var sendMail = function (recipient, subject, html) {

    smtpTransport.sendMail({
        from: config.email.user,
        to: recipient,
        subject: subject,
        html: html

    }, function (error, response) {
        if (error) {
            console.log(error);
        } else
        console.log('发送成功')
    });
}

module.exports = sendMail;