const URLs = require('../constants/urls.js');

const makeRedditUrl = (sub, after) => !after ? URLs[sub] : `${URLs[sub]}?count=25&after=${after}`; // eslint-disable-line no-confusing-arrow
module.exports = makeRedditUrl;
