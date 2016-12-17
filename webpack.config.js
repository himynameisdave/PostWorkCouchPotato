const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const webpack_dev_config = require('./webpack/webpack.config.dev.js');
const webpack_prod_config = require('./webpack/webpack.config.prod.js');

const TARGET = process.env.npm_lifecycle_event;


const webpack_config_common = {
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['', '.jsx']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'watchddit.com'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'scripts')
      }
    ]
  }
};

if (TARGET === 'start') {
  module.exports = merge(webpack_config_common, webpack_dev_config);
}

if (TARGET === 'build') {
  module.exports = merge(webpack_config_common, webpack_prod_config);
}
