//  Simple filter for if it has embedable media or not
const filterEmbedableMedia = ({ data }) => !!data.media && !!data.media.oembed && !!data.media.oembed.html;

module.exports = filterEmbedableMedia;
