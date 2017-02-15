const extractVideosFromResponse = require('./extract-videos-from-response.js');

const formatRedditResponse = url => ({ data }) => ({
    url,
    lastFetched: Date.now(),
    after: data.after,
    before: data.before,
    videos: extractVideosFromResponse(data.children),
});

module.exports = formatRedditResponse;
