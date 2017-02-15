//  TODO: not the best spot for this file
require('isomorphic-fetch');
const makeRedditUrl = require('../helpers/utils/make-reddit-url.js');
const formatRedditResponse = require('./utils/format-reddit-response.js');


const fetchVideos = (sub = 'videos', after) => {
    const url = makeRedditUrl(sub, after);
    const format = formatRedditResponse(url);
    return fetch(url)
      .then(data => data.json())
      .then(format);
};

module.exports = fetchVideos;
