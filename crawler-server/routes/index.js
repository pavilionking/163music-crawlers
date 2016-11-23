var express = require('express');
var Netease = require('../netease/netease')
var {list} = require('../netease/url')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("It Works!")
});

router.get('/api/playlist', (req, res, next)=>{
  let netease = new Netease();
  if (req.query.id) {
    netease.playlist(req.query.id)
      .then((value)=>{
        res.send(value);
      })
  } else {
    res.send({code: 400, msg: "required param 'id' is not present"});
  }
})


router.get('/discover/list', (req, res) => {
  let netease = new Netease();
  netease.fetchDiscoverPlaylist()
    .then((value)=>{
      console.log(value);
      res.send(value);
    })

})

module.exports = router;
