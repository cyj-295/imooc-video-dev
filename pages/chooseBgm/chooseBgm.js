const app = getApp()

Page({
    data: {
      bgmList: [],
      serverUrl: "",
      videoParams: {}
    },

    onLoad: function (params) {
      
      var me = this;
      console.log(params);
      me.setData({
        videoParams: params
      });

      wx.showLoading({
        title: '请等待...',
      });
      var serverUrl = app.serverUrl;
      var user = app.getGlobalUserInfo();
      
      // 调用后端
      wx.request({
        url: serverUrl + '/bgm/list',
        method: "POST",
        header: {
          'content-type': 'application/json', // 默认值
          'headerUserId': user.id,
          'headerUserToken': user.userToken
        },
        success: function (res) {
          console.log(res.data);
          wx.hideLoading();
          if (res.data.status == 200) {
            var bgmList = res.data.data;
            me.setData({
              bgmList: bgmList,
              serverUrl: serverUrl
            });
          } else if (res.data.status == 502) {
            wx.showToast({
              title: res.data.msg,
              duration: 2000,
              icon: "none",
              success: function () {
                wx.redirectTo({
                  url: '../userLogin/login',
                })
              }
            });
          }
        }
      })
    },

    upload:function(e){
      var me = this;
      var bgmId = e.detail.value.bgmId;
      var desc = e.detail.value.desc;
       console.log(bgmId);
       console.log(desc);

        var duration = me.data.videoParams.duration;
        var tmpHeight = me.data.videoParams.tmpHeight;
        var tmpWidth = me.data.videoParams.tmpWidth;
        var tmpVideoUrl = me.data.videoParams.tmpVideoUrl;
        var tmpCoverUrl = me.data.videoParams.tmpCoverUrl;

        //上传短视频
        wx.showLoading({
          title: '上传中',
        })
        var serverUrl = app.serverUrl;
        var user = app.getGlobalUserInfo();
        wx.uploadFile({
          
          filePath: tmpVideoUrl,
          formData: {
            userId:  user.id,
            bgmId: bgmId,
            desc: desc,
            videoSeconds: duration,
            videoHeight: tmpHeight,
            videoWidth: tmpWidth
          },
          name: 'file',
          header:{
            'content-type' : 'application/json'
          },
          url: serverUrl + '/video/upload',
          success:function(res){
            //格式化data
            var data = JSON.parse(res.data);
            wx.hideLoading();
            if(data.status == 200){
              wx.showToast({
                title: '上传成功！~',
                icon:"success"
              });
              wx.navigateBack({
                        delta: 1,
                      })

              // var videoId = data.data;
              // wx.showLoading({
              //   title: '上传中',
              // })
              // var user = app.getGlobalUserInfo();
              // wx.uploadFile({
                
              //   filePath: tmpCoverUrl,
              //   formData: {
              //     userId:  user.id,
              //     videoId: videoId
              //   },
              //   name: 'file',
              //   header:{
              //     'content-type' : 'application/json'
              //   },
              //   url: serverUrl + '/video/uploadCover',
              //   success:function(res){
              //     //格式化data
              //     var data = JSON.parse(res.data);
              //     wx.hideLoading();
              //     if(data.status == 200){
              //       wx.showToast({
              //         title: '上传成功！~',
              //         icon:"success"
              //       });
              //       wx.navigateBack({
              //         delta: 1,
                      
              //       })
              //   }else{
              //     wx.showToast({
              //       title: '上传失败！~',
              //       icon:"success"
              //     });
              //   }
              //   }
              // })


          }else{
            wx.showToast({
              title: '上传失败！~',
              icon:"success"
            });
          }
          }
        })
    }

})

