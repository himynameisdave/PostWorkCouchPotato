require('isomorphic-fetch');
const express = require('express');
const setRequestHeaders = require('./utils/set-request-headers.js');
const URLs = require('../helpers/constants/urls.js');
const been = require('../helpers/utils/been.js');
const makeCache = require('./cache');
const fetchVideos = require('./fetch-videos');

const router = express.Router();
let cache = makeCache();

//  has side effects, could be better...
const updateCache = (data) => {
  cache[data.url] = data;
  return data;
};

const isCacheValid = _cache => _cache.videos.length && !been(1).mins.since(_cache.lastFetched || Date.now());


//  Set api headers
router.use(setRequestHeaders);

router.get('/videos', (req, res) => {
  const relevantCache = cache[URLs.videos];
  //  If we have cached items
  if (relevantCache && isCacheValid(relevantCache)) {
    return res.send(relevantCache);
  }

  return fetchVideos('videos')
    .then(updateCache)
    .then(d => res.send(d))
    .catch(e => res.json({
      error: `Error fetching: ${e}`
    }));
});


router.get('/videos/:after', (req, res) => {
  //  should test req.params.after
    const url = `${URLs.videos}?count=25&after=${req.params.after}`;
    const relevantCache = cache[url];
    if (relevantCache && isCacheValid(relevantCache)) {
        return res.send(relevantCache);
    }

    return fetchVideos('videos', req.params.after)
      .then(updateCache)
      .then(d => res.send(d))
      .catch(e => res.json({
        error: `Error fetching: ${e}`
      }));
});


module.exports = router;
