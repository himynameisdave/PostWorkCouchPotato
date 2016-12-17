const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');


module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    // historyApiFallback: true, // used for things like react-router
    hot: true,  //  dem hot modules
    inline: true, // inline vs iframe, see: https://webpack.github.io/docs/webpack-dev-server.html#inline-mode
    progress: true, // show a progress bar when building
    stats: 'errors-only', // only log errors
    // Parse host and port from env to allow customization.
    // host: process.env.HOST,
    port: process.env.PORT || 6969
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin()
  ]
};
