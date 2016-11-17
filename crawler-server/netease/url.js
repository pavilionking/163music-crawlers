module.exports.domain = "http://music.163.com"
module.exports.header = {"Referer": "http://music.163.com/"};
/**
 * 网易api
 * @type {Object}
 */
module.exports.urls = {
  discover: {
    role: "榜单",
    url: "/discover/playlist/"
  },
  s: {
    role: "查找",
    url: "/api/search/get/"
  },
  album: {
    role: "专辑",
    url: "/api/album/@RID?id=@RID&csrf_token="
  },
  playlist: {
    role: "播放列表",
    url: "/api/playlist/detail?id=@RID&csrf_token="
  },
  song: {
    role: "单曲",
    url: "/api/song/detail/?id=@RID&ids=[@RID]&csrf_token="
  },
  program: {
    url: "/api/dj/program/detail/?id=@RID&ids=[@RID]&csrf_token="
  },
  radio: {
    url: "/api/dj/program/byradio/?radioId=@RID&ids=[@RID]&csrf_token="
  },
  mv: {
    role: "mv",
    url: "/api/mv/detail/?id=@RID&ids=[@RID]&csrf_token="
  }
};

/**
 * 榜单id
 */
module.exports.list = {
  newest: 3779629, //最新
  hot: 3778678,     //热歌
  rise: 19723756,   //飙升
  origianl: 2884035  //原创
};
