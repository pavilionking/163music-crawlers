const request = require('request');
const q = require('q');
const {urls, domain, header} = require('./url');

const msType = {
  song: 1,
  album: 10,
  artist: 100,
  playlist: 1000,
  mv: 1004,
  radio: 1009
}

class Netease {

  constructor() {
    this.limit = 100;
  }

  songInfo(song, type=msType.song) {
    return song;
  }

  /**
   * 搜索
   */
  search(s, type=msType.song) {
    let deferred = q.defer();
    let reqBody = {"s": s, "limit": this.limit, "sub":false, "type": type, "offset": 0};
    let options = {headers: {"Connection": "close"}, uri: urls.s.url, method: "POST", json: true, body: reqBody}
    // console.log(options);
    request.post(domain + urls.s.url, {form: reqBody, headers: header}, (err, res, resBody)=>{
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(resBody, type);
      }
    });
    return deferred.promise;
  }

  /**
   * 歌单
   */
  playlist(id) {
    let deferred = q.defer();
    let url = urls.playlist.url.replace(/@RID/g, id);
    request(domain + url, {header: header}, (err, res, body)=>{
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(body);
      }
    })
    return deferred.promise;
  }

  getSongs(data) {
    if (data.code == 200) {
      var result = {code: 200, playload: {}};
      var playload = result.playload;
      playload.coverImgUrl = data.result.coverImgUrl;
      playload.description = data.result.description;
      playload.name = data.result.name;


    } else {
      return {code: 400, msg: "sth. wrong!"}
    }
  }

}


function getSong(cb) {
  let netease = new Netease();
  // netease.search("女儿情", msType.song)
  //   .then(netease.songInfo)
  //   .done((data)=>{
  //     console.log(data);
  //   });
  netease.playlist(19723756).then((value) => {
    var result = netease.getSongs(value);
    console.log(result);
  })
}

getSong()

// let netease = new Netease();
// let pro = netease.search(decodeURIComponent("女儿情"))
//   .then(netease.songInfo)
//   .fail((err)=>{
//     console.log(err);
//   })

module.exports = Netease;
