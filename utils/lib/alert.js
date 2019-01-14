function alert(types,msg){
  switch(types){
    case 1:
    wx.showToast({
      title: msg,
      image: ''//错误提示图
    })
      break;
    case 2:
      wx.showToast({
        title: msg,
        icon: 'success'//成功提示框
      })
      break;
    case 3:
      wx.showToast({
        title: msg,
        image: 'loading'//加载提示框
      })
      break;
  }
}
module.exports.alert=alert;