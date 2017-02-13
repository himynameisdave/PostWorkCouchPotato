const defaultWatchddit = require('../../helpers/constants/default-watchddit.js');

const formatResponseVideo = ({ id, name, author, created_utc, domain, media, permalink, score, title }) => ({
    fetchedAt: Date.now(),
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
});

module.exports = formatResponseVideo;
