// pages/task/step2/step2.js
var tgyz = require('../../../utils/tgyz.js')
var login = require('../../../utils/lib/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disable:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(wx.getStorageSync('taskInfo'));
    this.setData({
      taskInfo:wx.getStorageSync('taskInfo')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  refer:function(e){
    this.setData({
      disable:true
    })
    var formData = this.data.taskInfo;
    tgyz.request({
      url: tgyz.host +'/Task/index',
      method:'POST',
      data:{
        'formData': formData
      },
      success:function(data){
        console.log(data);
        wx.removeStorageSync('taskInfo');
        wx.switchTab({
          url: '/pages/task/taskList/taskList',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      disable:false
    })
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