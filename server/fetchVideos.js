//  TODO: not the best spot for this file
require('isomorphic-fetch');
const makeRedditUrl = require('../helpers/utils/make-reddit-url.js');
const extractVideosFromResponse = require('./utils/extract-videos-from-response');


const formatRedditResponse = url => ({ data }) => ({
    url,
    lastFetched: Date.now(),
    after: data.after,
    before: data.before,
    videos: extractVideosFromResponse(data.children),
});


const fetchVideos = (sub = 'videos', after) => {
    const url = makeRedditUrl(sub, after);
    const format = formatRedditResponse(url);
    return fetch(url)
      .then(data => data.json())
      .then(format);
};

module.exports = fetchVideos;
