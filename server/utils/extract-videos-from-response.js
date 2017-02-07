const formatResponseVideo = require('./format-response-video.js');
const filterEmbedableMedia = require('../../helpers/utils/filter-embedable-media.js');

//  Expects data.children array from repsonse
const extractVideosFromResponse = data => data
          .filter(filterEmbedableMedia)
              .map(d => d.data)
              .map(formatResponseVideo);


module.exports = extractVideosFromResponse;
