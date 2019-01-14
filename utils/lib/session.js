/*
* @Author: Howell
* @Date:   2018-08-14 11:53:33
* @Last Modified by:   Howell
* @Last Modified time: 2018-08-14 11:54:29
*/
var sessionKey = 'TGYZ-TOKEN';
var Session = {
    get: function() {
        return wx.getStorageSync(sessionKey) || null
    },
    set: function(session) {
        wx.setStorageSync(sessionKey, session)
    },
    clear: function() {
        wx.removeStorageSync(sessionKey)
    }
}

module.exports = Session;