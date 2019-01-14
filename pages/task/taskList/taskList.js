// pages/task/taskList/taskList.js
var tgyz = require('../../../utils/tgyz.js');
var that;
var pages = 0;
var limit = 5;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navChecked: [1, 0, 0, 0, 0,0],
    orderlList: [],
    loadingHidden: true,
    start: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    pages = 0; //初始化页数
    that.setData({
      "orderlList": [], //初始化加载数据； 
      start: 0,
    })
    that.getOrderList(0, 1) //0页，1种；
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
    wx.stopPullDownRefresh();
    pages = 0; //初始化页数
    that.setData({
      "orderlList": [], //初始化加载数据；  
      'start': 0
    })
    var arr = that.data.navChecked;
    var index = arr.indexOf(1); //当前选中的为1；
    that.getOrderList(0, index + 1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    pages++;
    var arr = that.data.navChecked;
    var index = arr.indexOf(1); //当前选中的为1；
    that.getOrderList(pages, index + 1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取订单列表的方法；
  getList: function (res) {
    pages = 0; //初始化页数
    var status = res.currentTarget.dataset.status;
    if (status > 3) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
    if (status == 1) {
      that.setData({
        'navChecked': [1, 0, 0, 0, 0,0],
        "orderlList": [], //初始化加载数据；  
        'start': 0
      })
    } else if (status == 2) {
      that.setData({
        'navChecked': [0, 1, 0, 0, 0,0],
        "orderlList": [], //初始化加载数据；  
        'start': 0
      })
    } else if (status == 3) {
      that.setData({
        'navChecked': [0, 0, 1, 0, 0,0],
        "orderlList": [], //初始化加载数据；  
        'start': 0
      })
    } else if (status == 4) {
      that.setData({
        'navChecked': [0, 0, 0, 1, 0,0],
        "orderlList": [], //初始化加载数据；  
        'start': 0
      })
    } else if (status == 5) {
      that.setData({
        'navChecked': [0, 0, 0, 0, 1,0],
        "orderlList": [], //初始化加载数据； 
        'start': 0
      })
    } else if (status == 6) {
      that.setData({
        'navChecked': [0, 0, 0, 0, 0,1],
        "orderlList": [], //初始化加载数据； 
        'start': 0
      })
    }
    that.loadingTap(status);


  },
  //获取订单列表
  getOrderList: function (pages, param) {
    tgyz.request({
      url: tgyz.host + '/OrderList/orderList',
      data: {
        'status': param,
        'limit': limit,
        'offset': pages,
      },
      success:function(res){
        if (pages == 0 && res.data.data.length == 0) {
          that.setData({
            "orderlList": [],
            'start': 1
          })
        } else {
          if ((res.data.data.length >= 1)) {
            for (var i = 0; i < res.data.data.length; i++) {
              that.data.orderlList.push(res.data.data[i])
            }
            that.setData({
              "orderlList": that.data.orderlList,
              'start': 1
            })
          } else {
            that.setData({
              "orderlList": that.data.orderlList,
              'start': 1
            })
            wx.showToast({
              title: '已显示全部数据',
              icon: "none",
              duration: 1000
            })
          }
        }
      }
    })
  },
  taskDetail: function (param) {
    var taskId = param.currentTarget.dataset.taskid
    wx.navigateTo({
      url: '/pages/task/taskDetail/taskDetail?taskid=' + taskId
    })
  },
  //加在层；
  loadingTap: function (status) {
    this.setData({
      loadingHidden: false
    });
    var that = this;
    setTimeout(function () {
      that.setData({
        loadingHidden: true
      });
      that.getOrderList(0, status)
    }, 1000);
  }
})