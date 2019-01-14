// pages/work/taskdetail/taskdetail.js
var tgyz = require('../../../utils/tgyz.js');
var that
//获取屏幕信息
var sysInfo = wx.getSystemInfoSync();
var winHeight = (sysInfo.windowHeight);
//创建一个动画实例
var animation = wx.createAnimation({
  duration: 500,
  timingFunction: "ease",
  delay: 0
});
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isCancel: false,
    taskDetail: '',
    phonecall: '',
    taskid: 0,
    animationData: {},
    //动画移动参数
    shadeHeight: 0,
    bidText: '已设为中标',
    applyReason: '', //申请原因
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    //初始化筛选框动画参数
    var query = wx.createSelectorQuery()
    query.select('.cancel-box').boundingClientRect()
    query.exec(function(res) {
      that.setData({
        'shadeHeight': -res[0].height,
      })
    })
    that.setData({
      'taskid': options.taskid,
    })
    that.masterList(options.taskid);
  },
  masterList: function(taskid) {
    tgyz.request({
      url: tgyz.host + '/Task/taskDetail?taskid=' + taskid,
      success: function(res) {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.setData({
            'taskDetail': res.data.data,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //查看大图
  previewImg: function(e) {
    //获取当前图片的下标
    var index = e.target.dataset.index;
    //所有图片（需要放大图片的数组）
    var image_photo = this.data.taskDetail.pics;
    wx.previewImage({
      //当前显示图片
      current: image_photo[index],
      //所有图片
      urls: image_photo
    })
  },
  // 选择该师傅,或拒绝招用该师傅
  chooseMaster: function(e) {
    var bidId = e.currentTarget.dataset.bidid;
    var status = e.currentTarget.dataset.status;
    console.log(that.data.taskid)
    tgyz.request({
      url: tgyz.host + '/Task/choosemaster',
      data: {
        'bidId': bidId,
        'status': status,
        'taskId': that.data.taskid
      },
      success: function(res) {
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
        })
        that.onLoad();
      }
    })
  },
  //打电话；
  callPhone: function(param) {
    wx.makePhoneCall({
      phoneNumber: param.currentTarget.dataset.phone
    })
  },
  //一键招满
  toFull: function(e) {
    tgyz.request({
      url: tgyz.host + '/Task/toFull',
      data: {
        'taskId': that.data.taskid
      },
      success: function(res) {
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
        })
        that.onLoad();
      }
    })
  },
  //商户确认完工//单个师傅；
  overWork: function(e) {
    tgyz.request({
      url: tgyz.host + '/Task/complete',
      data: {
        'bid_id': e.currentTarget.dataset.bidid,
        'taskId': that.data.taskid
      },
      success: function(res) {
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
        })
        that.onLoad();
      }
    })
  },
  //申请取消任务
  cancelBid: function() {
    animation.translateY(that.data.shadeHeight).step()
    that.setData({
      'isCancel': true,
      animationData: animation.export(),
    })
  },
  //取消申请
  cancelApply: function() {
    animation.translateY(0).step()
    that.setData({
      'isCancel': false,
      'applyReason': '',
      animationData: animation.export(),
    })
  },
  //获取申请原因
  getReason: function(res) {
    that.setData({
      'applyReason': res.detail.value,
    })
  },
  //申请取消任务
  confirmApply: function(param) {
    console.log(that.data.applyReason);
    tgyz.request({
      url: tgyz.host + '/Task/cancelTask',
      data: {
        'reason': that.data.applyReason,
        'taskId': that.data.taskid,
      },
      success: function(res) {
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/task/taskList/taskList',
          })
        }, 1000)
      }
    })
  },
  //取消任务看原因
  lookReason:function(e){
    wx.showModal({
      title: '师傅申请取消任务',
      content: e.target.dataset.reason,
      showCancel: true,
      cancelText: '拒绝取消',
      cancelColor: '',
      confirmText: '同意取消',
      confirmColor: '',
      success: function(res) {
        if(res.confirm===true){
          tgyz.request({
            url:tgyz.host+'/Task/agreeCancel',
            data: {
              'bid_id': e.target.dataset.bidid,
              'taskId': that.data.taskid
            },
            success:function(res){
              wx.showToast({
                icon: 'none',
                title: res.data.msg,
              })
              that.onLoad();
            }
          })
        }
      }
    })
  }
})