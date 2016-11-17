class BaseService {
  constructor() {
    this.domain = "http://127.0.0.1:3000";
  }

  request(url, data, scb, fcb, method="get"){
    wx.request({
      url: this.domain + url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res){
        if (res.data.code == 200) {
          scb && scb(res.data)
        } else {
          if (fcb) {
            fcb(data)
          } else {
            wx.showModal({
              title: "提示",
              content: "网络错误,请稍后重试！",
              showCancel: false,
              success: function(res){
                if (res.confirm) {
                  wx.hideToast()
                }
              }
            })
          }
        }
      }
    })
  }

}

module.exports.baseService = new BaseService();
