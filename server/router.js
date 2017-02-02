require('isomorphic-fetch');
const express = require('express');
const makeCache = require('./cache');
const router = express.Router();
let cache = makeCache();
const fetchVideos = require('./fetchVideos');


//  TODO: break off & test this
const beenFiveMins = time => Date.now() - time >= 300000;

//  Set api headers
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:6969');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  next();
});

// router.use('/', (req, res) => res.json({ message: 'you are at /api/, use /api/videos' }));
router.use('/videos', (req, res) => {

  //  This could be done better...
  // if (cache.videos.length && !beenFiveMins(cache.lastFetched || Date.now())) {
  //   return res.send(cache);
  // }

  fetchVideos()
    .then(d => {
        console.log('She wants the d ===\n', d);
        return d;
    })
    .then(responseObject => {
        cache = responseObject;
        res.send(responseObject);
    })
    .catch(e => res.json({
      error: `Error fetching: ${e}`
    }));
});


router.use('/videos/:after', (req, res) => {
  req.params
});


module.exports = router;
