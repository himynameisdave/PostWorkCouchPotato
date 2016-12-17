const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');


module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:5000',
    'webpack/hot/dev-server',
    './src/index.js'
  ],
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin()
  ]
};
