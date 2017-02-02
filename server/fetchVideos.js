require('isomorphic-fetch');
//  TODO: not the best spot for this file
const URLs = {
    videos: 'https://www.reddit.com/r/videos/.json',
    videosRising: 'https://www.reddit.com/r/videos/rising/.json',
    haiku: 'https://www.reddit.com/r/youtubehaiku/.json'
};
const defaultWatchddit = { watchedVideo: false, isActiveVideo: false, };

const makeUrl = sub => after => !after ? URLs[sub] : `${URLs[sub]}?count=25&after=${after}`; // eslint-disable-line no-confusing-arrow
const videosUrl = makeUrl('videos');
const risingVideosUrl = makeUrl('videosRising');
const haikusUrl = makeUrl('youtubehaiku');

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


const formatRedditResponse = ({ data }) => ({
    lastFetched: Date.now(),
    after: data.after,
    before: data.before,
    videos: extractVideosFromResponse(data.children),
});


const fetchVideos = (after, sub) => {
    return fetch(URLs.videos)
      .then(redditData => redditData.json())
      .then(formatRedditResponse);
};

module.exports = fetchVideos;
