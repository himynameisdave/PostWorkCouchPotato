const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const webpack_dev_config = require('./webpack/webpack.config.dev.js');
const webpack_prod_config = require('./webpack/webpack.config.prod.js');

const TARGET = process.env.npm_lifecycle_event;


const webpack_config_common = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, './public/'),
    filename: 'bundle.[hash].js'
    // publicPath: path.join(__dirname, '/public/')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /\\node_modules/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }, {
        test: /\.jsx?$/,
        exclude: /\\node_modules/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'watchddit ~ watch the internet',
      filename: 'index.html',
      template: './webpack/webpack.index-template.ejs',
      inject: 'body',
      appMountId: 'app'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(webpack_config_common, webpack_dev_config);
}

if (TARGET === 'build') {
  module.exports = merge(webpack_config_common, webpack_prod_config);
}
