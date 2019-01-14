//app.js
var tgyz = require('/utils/tgyz.js')
var login = require('/utils/lib/login.js');
App({
  onLaunch: function () {
    login.getWxLoginResult(
      function (code, userInfo){
        wx.setStorageSync('code', userInfo.code)
        // console.log(wx.getStorageSync('code'));
      }
    )
  },
  globalData: {
    userInfo: null
  }
})