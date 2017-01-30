const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const router = require('./router.js');
let PORT = 6868;
if (process.env.NODE_ENV === 'production') {
  PORT = process.env.PORT || 5000;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//  Serve the /public/ dir
app.use('/', express.static('public'));
//  Also serve the /api/
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
