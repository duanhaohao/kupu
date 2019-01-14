/*
* @Author: Howell
* @Date:   2018-8-14 11:07:48
* @Last Modified by:   Howell
* @Last Modified time: 2018-08-14 11:55:01
*/
var loginLib = require('./lib/login.js'),
    request = require('./lib/request.js'),
    Session = require('./lib/session.js'),
    // host = "https://www.easy-mock.com/mock/5b74e61f5ec4891242bc6522/tgyz/project";
    host = "https://wechat.tiangongyizhan.com/api";
module.exports = {
    login: loginLib.login,
    setLoginUrl: loginLib.setLoginUrl,
    request: request.request,
    sessionClear: Session.clear(),
    host:host
}