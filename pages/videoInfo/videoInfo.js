const { uploadVideo } = require("../../util/videoUtil.js");
var videoUtil = require("../../util/videoUtil.js")
const app =   getApp()

Page({
  data: {
    cover:"cover",
    videoId: "",
    src: "",
    videoInfo: {},
  },

  videoCtx: {},

  onLoad:function(params){
    var me = this;
    me.videoCtx = wx.createVideoContext('myVideo', me);

    //获取上一个页面传入的参数
    var videoInfo = JSON.parse(params.videoInfo);

    var height = videoInfo.height;
    var width = videoInfo.width;
    var cover = "cover";
    if( width >= height ){
      cover = "";
    }

    me.setData({
      videoId : videoInfo.id,
      src : app.serverUrl + videoInfo.videoPath,
      videoInfo : videoInfo,
      cover : cover
    });

  },

  onShow:function(){
    var me =this;
    me.videoCtx.play();
  },

  onHide:function(){
    var me = this;
    me.videoCtx.pause();
  },

  showSearch:function(){
    wx.navigateTo({
      url: '../searchVideo/searchVideo'
    })
  },

  upload: function () {
    var me = this;

    var user = app.getGlobalUserInfo();

    var videoInfo = JSON.stringify(me.data.videoInfo);
    var realUrl = '../videoInfo/videoInfo#videoInfo@' + videoInfo;

    if (user == null || user == undefined || user == '') {
      wx.navigateTo({
        url: '../userLogin/login?redirectUrl=' + realUrl,
      })
    } else {
      videoUtil.uploadVideo();
    }
    
  },

  showIndex:function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  showMine: function(){

    var user = app.getGlobalUserInfo();

    if( user == null || user == '' || user == undefined){
      wx.navigateTo({
        url: '../userLogin/login',
      })
    }else{
      wx.navigateTo({
        url: '../mine/mine',
      })
    }

    
  }
})