require('isomorphic-fetch');
const express = require('express');
const setRequestHeaders = require('./setRequestHeaders.js');
const URLs = require('./urls.js');
const makeCache = require('./cache');
const fetchVideos = require('./fetchVideos');

const router = express.Router();
let cache = makeCache();


//  TODO: break off & test this
const beenFiveMins = time => Date.now() - time >= 300000;

const been = since => ({ mins: time => Date.now() - time > (since * 60 * 1000) });

//  has side effects, could be better...
const updateCache = (data) => {
  cache[data.url] = data;
  return data;
};

const isCacheValid = _cache => _cache.videos.length && !been(3).mins(_cache.lastFetched || Date.now());


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
