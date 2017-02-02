//  TODO: not the best spot for this file
require('isomorphic-fetch');
const URLs = require('./urls.js');

/*
////////
//////

    rename all files to hyphens because linux


/////
&/*/

const defaultWatchddit = { watchedVideo: false, isActiveVideo: false, };


const makeUrl = (sub, after) => !after ? URLs[sub] : `${URLs[sub]}?count=25&after=${after}`; // eslint-disable-line no-confusing-arrow
//  Simple filter for if it has embedable media or not
const filterEmbedableMedia = ({ data }) => !!data.media && !!data.media.oembed && !!data.media.oembed.html;
/* expects the data.children array */
const extractVideosFromResponse = (data) => data.filter(filterEmbedableMedia).map(d => d.data)
                                                  .map(({ id, name, author, created_utc, domain, media, permalink, score, title }) => ({
                                                      id,
                                                      name,
                                                      author,
                                                      domain,
                                                      created: created_utc,
                                                      title,
                                                      score,
                                                      reddit_link: permalink,
                                                      embed: {
                                                          html: media.oembed.html,
                                                          thumbnail: media.oembed.thumbnail_url,
                                                      },
                                                      watchddit: defaultWatchddit,
                                                  }));


const formatRedditResponse = url => ({ data }) => ({
    url,
    lastFetched: Date.now(),
    after: data.after,
    before: data.before,
    videos: extractVideosFromResponse(data.children),
});


const fetchVideos = (sub = 'videos', after) => {
    const url = makeUrl(sub, after);
    const format = formatRedditResponse(url);
    return fetch(url)
      .then(data => data.json())
      .then(format);
};

module.exports = fetchVideos;
