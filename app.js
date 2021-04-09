// app.js
App({
  serverUrl: "http://10.10.1.194:8081",
  userInfo: null,
  setGlobalUserInfo: function(user) {
    wx.setStorageSync("userInfo", user);
  },

  getGlobalUserInfo: function () {
    return wx.getStorageSync("userInfo");
  },
})
