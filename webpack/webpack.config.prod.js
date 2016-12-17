const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify('production') // eslint-disable-line
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ]
};
