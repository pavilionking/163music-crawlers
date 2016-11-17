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
    var that = this
    // console.log(s.baseService);
    s.baseService.request("/api/playlist", {id: this.data.musicList[this.data.currentTab].id}, (res)=>{
      console.log(res);
    })

  },
  musicListItemTab: function(ev){
    this.setData({
      currentTab: ev.target.dataset.index
    })
    wx.setStorage({
      key: "listItemCurrentTab",
      data: ev.target.dataset.index
    })
  }
})
