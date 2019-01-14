// pages/index/index.js
var tgyz = require('../../utils/tgyz.js')
var login = require('../../utils/lib/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carousel:[],
    item:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (wx.getStorageSync('userInfo')){
      that.getItem();
    }else{
      tgyz.request({
        url:tgyz.host+'/Oauth/login',
        method:'POST',
        success: function (result){
          that.getItem();
        }
      })
    }
  },
  /*获取首页列表项*/
  getItem:function(){
    var that=this;
    tgyz.request({
      url: tgyz.host + '/Index/index',
      success: function (res) {
        that.setData({
          carousel: res.data.data['pic'],
          item: res.data.data['item']
        })
      }
    })
  },
  task:function(e){
    var work_id=e.currentTarget.id;
    var work_name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/task/step1/step1?work_id=' + work_id+' &work_name='+work_name,
    })
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
  
  },
})