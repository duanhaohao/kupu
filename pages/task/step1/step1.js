// pages/task/step1/step1.js
var nowTime = require('../../../utils/util.js');
var alert= require('../../../utils/lib/alert.js');
var tgyz = require('../../../utils/tgyz.js');
var amapFile = require('../../../utils/lib/amap-wx.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    work_property:1,
    interval_price:0,
    image_photo:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:options.work_name//页面标题为路由参数
    })
    this.setData({
      'work_type': options.work_id,
       work_name:options.work_name,
      'start_time': nowTime.formatTime2(new Date())
    })
    // console.log(options)
  },
  //tab切换
  tabNav:function(e){
    // console.log(e);
    if (this.data.work_property == e.target.dataset.work_property){
      return false;
    }else{
      this.setData({
        work_property: e.target.dataset.current
      })
    }
  },
  //选择框白夜班
  radioChange:function(e){
    var category = e.detail.value.split(',')
    // console.log(category);
    this.setData({
      'is_day': category[0],
      'work_time':category[1],
    })
  },
  //获取地址
  address:function(e){
    // console.log(e);
    var that=this
    wx.chooseLocation({
      success:function(res){
        // console.log(res);
        that.setData({
          work_address:res.address,
          lat: res.latitude,
          lng: res.longitude
        })
        that.loadCity(res.latitude, res.longitude);
      }
    })
  },
  loadCity: function (latitude, longitude) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: 'e998871c6f15992ef7ba202ad3c28cf5'
    });
    myAmapFun.getRegeo({
      success: function (data) {
        var postion = data[0].regeocodeData.addressComponent;
        that.setData({
          "area_code": postion.adcode.substr(0, 4) + '00',
        })
      },
      fail: function (info) { }
    });
  },
  //获取人数
  workerNum:function(e){
    // console.log(e);
    this.setData({
      'worker_num':e.detail.value
    })
  },
  //区间价获取
  sum:function(e){
    // console.log(e);
    var type = e.currentTarget.dataset.type;
    var money = this.data.interval_price;
    if(type=='-'){
      if(money<1){
        return false;
      }
      money = money-5
    }
    if (type=='+'){
      money = money + 5
    }
    this.setData({
      interval_price: money
    })
  },
  blur:function(e){
    var money = parseInt(e.detail.value);
    this.setData({
      interval_price: money
    });
  },
  //日期选择
  bindDateChange:function(e){
    this.setData({
      'start_time':e.detail.value
    })
  },
  //预计工期
  predictTime:function(e){
    this.setData({
      predict_time:e.detail.value
    })
  },
  //施工内容
  workContent:function(e){
    this.setData({
      work_content: e.detail.value
    })
  },
  //联系人
  contact: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },
  //联系电话
  contentTel:function(e){
    this.setData({
      contact_tel:e.detail.value
    })
  },
  //我要留言
  message:function(e){
    this.setData({
      message:e.detail.value
    })
  },
  //提交表单
  formSubmit:function(e){
    var formData = e.detail.value;
    if(formData['is_day']==''){
      alert.alert(1,'请选择工作时间')
      return false;
    }
    if (formData['work_address'] == '') {
      alert.alert(1, '请选择工作地址')
      return false;
    }
    if (formData['worker_num'] == '') {
      alert.alert(1, '请选择需要人数')
      return false;
    }
    if (formData['interval_price'] == '') {
      alert.alert(1, '请选择区间价')
      return false;
    }
    if (formData['start_time'] == '') {
      alert.alert(1, '请选择开工日期')
      return false;
    }
    if (formData['predict_time'] == '') {
      alert.alert(1, '请填写预计用工时间')
      return false;
    }
    if (formData['work_content'] == '') {
      alert.alert(1, '请填写施工内容')
      return false;
    }
    if (formData['content'] == '') {
      alert.alert(1, '联系人不能为空')
      return false;
    }
    if (formData['contact_tel'] == '' || formData['contact_tel'].length!=11) {
      alert.alert(1, '请填写正确联系方式')
      return false;
    }
    if (formData['message'] == '') {
      alert.alert(1, '留言不能为空')
      return false;
    }
    wx.setStorageSync('taskInfo', formData)
    wx.navigateTo({
      url: '/pages/task/step2/step2',
    })
  },
  //包工
  //上传图片
  chooseimg: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var image_photo = that.data.image_photo;
        var tempFilePaths = res.tempFilePaths;
        if (that.data.image_photo.length > 5) {
          wx.showToast({
            title: '不能超过6张',
          })
          setTimeout(function () {
            wx.hideToast()
          }, 2000)
        } else {
            wx.uploadFile({
              url: tgyz.host + '/Task/upload',
              filePath: res.tempFilePaths[0],
              name: 'files',
              success:function(res){
                wx.showLoading({
                  title: '上传成功',
                })
                setTimeout(function () {
                  wx.hideLoading()
                },1000)
                var image=JSON.parse(res.data);
                that.setData({
                  image_photo: image_photo.concat(image.data)
                })
              }
            })
        }
      }
    })
  },
  //查看大图
  previewImg:function(e){
    //获取当前图片的下标
    var index = e.target.dataset.index;
    //所有图片
    var image_photo = this.data.image_photo;
    wx.previewImage({
      //当前显示图片
      current: image_photo[index],
      //所有图片
      urls: image_photo
    })
  },
  //总价格
  totalPrice:function(e){
    this.setData({
      total_price: e.detail.value
    })
  },
  category:function(e){
    var formData = e.detail.value;
    if (formData['work_address'] == '') {
      alert.alert(1, '请选择工作地址')
      return false;
    }
    if (formData['start_time'] == '') {
      alert.alert(1, '请选择开工日期')
      return false;
    }
    if (formData['content'] == '') {
      alert.alert(1, '联系人不能为空')
      return false;
    }
    if (formData['contact_tel'] == '' || formData['contact_tel'].length != 11) {
      alert.alert(1, '请填写正确联系方式')
      return false;
    }
    if (formData['work_content'] == '') {
      alert.alert(1, '请填写施工内容')
      return false;
    }
    wx.setStorageSync('taskInfo', formData)
    wx.navigateTo({
      url: '/pages/task/step2/step2',
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