// pages/selectIdentity/selectIdentity.js
var tgyz = require('../../utils/tgyz.js')
var login = require('../../utils/lib/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_type:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var usertype;
    if(wx.getStorageSync('userInfo')){
      usertype = wx.getStorageSync('userInfo');
      if (usertype['user_type']==0){
        wx.switchTab({ //商户首页
          url: "/pages/index/index"
        })
      } else if (usertype['user_type'] == 1){
        wx.switchTab({ //师傅首页
          url: "/pages/personal/index/index"
        })
      }
    }
  },
  getUserInfo:function(e){
    // console.log(e.currentTarget.dataset.id);
    var user_type = e.currentTarget.dataset.id;
    tgyz.request({ //
      url: tgyz.host + '/Oauth/wechat',
      method: 'POST',
      data: {
        'code': wx.getStorageSync('code'),
        'user_type': user_type,
        'wx_name': e.detail.userInfo.nickName,
        'wx_headimg': e.detail.userInfo.avatarUrl,
        'sex':e.detail.userInfo.gender
      },
      success: function (res) {
        wx.removeStorageSync('code');
        wx.setStorageSync('userInfo', res.data.data);
        console.log(res);
        if (e.detail.userInfo && user_type == 0) {
          wx.switchTab({
            url: "/pages/index/index"
          })
        }
        if (e.detail.userInfo && user_type == 1) {
          wx.switchTab({
            url: "/pages/personal/index/index"
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '网络错误,请查看网络',
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})