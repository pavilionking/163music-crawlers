//index.js
//获取应用实例
var s = require('../../utils/service');
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    musicList: app.globalData.musicList,
    currentTab: wx.getStorageSync("listItemCurrentTab") || "0"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    console.log('onLoad')
    this.fetchMusic()
    this.getSong()
  },

  musicListItemTab: function(ev){
    this.setData({
      currentTab: ev.target.dataset.index
    })
    this.fetchMusic()
    wx.setStorage({
      key: "listItemCurrentTab",
      data: ev.target.dataset.index
    })
  },

  displayListItemTap: function(ev){
    var idx = ev.currentTarget.dataset.index;
    var song = this.data.displayList.tracks[idx];
    this.setData({song: song})
    wx.setStorage({ key: "playingSong", data: song })
    wx.playBackgroundAudio({
      dataUrl: song.mp3Url,
      title: song.name,
      coverImgUrl: song.album.picUrl || song.album.blurPicUrl
    })
  },

  fetchMusic: function() {
    var that = this
    var currentId = this.data.musicList[this.data.currentTab].id
    var rs = wx.getStorageSync(currentId)
    var now = new Date().getTime();
    if (rs == undefined || rs == "" || now - rs.updateTime > app.globalData.expires) {
      s.baseService.request("/api/playlist", {id: currentId}, (res)=>{
        if (res.code == 200) {
          that.setData({displayList: res.result});
          wx.setStorage({key: currentId + "", data: res.result})
        } else {
          that.setData({errmsg: res.msg})
        }
      })
    } else {
      that.setData({displayList: rs});
    }
    console.log(this.data.displayList);
  },

  getSong: function(){
    var that = this
    wx.getStorage({
      key: "playingSong",
      success: function(res) {
        console.log(res);
        that.setData({song: res.data})
      },
      fail: function(data) {
        that.setData({
          song: that.data.displayList.tracks[0]
        })
      }
    })
  }

})
