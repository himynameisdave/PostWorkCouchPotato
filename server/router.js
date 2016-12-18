const express = require('express');
const router = express.Router();
require('isomorphic-fetch');

//  Set api headers
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:6969');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  next();
});

// router.use('/', (req, res) => res.json({ message: 'you are at /api/, use /api/videos' }));
router.use('/videos', (req, res) => {
  const baseUrl = 'https://www.reddit.com/r/videos/.json';
  //  Build out our response object
  fetch(baseUrl)
    .then(redditData => redditData.json())
    .then((redditData) => {
      const responseObject = {
        after: redditData.data.after,
        before: redditData.data.before,
        videos: redditData.data.children.map(({ data }) => ({
          id: data.id, // confusing, may not need...
          name: data.name, // similar to .id but like `t3_ai29akd`
          author: data.author,
          created: data.created_utc,
          domain: data.domain,
          embed: {
            html: data.media.oembed.html,
            thumbnail: data.media.oembed.thumbnail_url
          },
          reddit_link: data.permalink,
          score: data.score,
          title: data.title
        }))
      };

      res.send(responseObject);
    })
    .catch(e => res.json({
      error: `Error fetching: ${e}`
    }));
});

module.exports = router;
