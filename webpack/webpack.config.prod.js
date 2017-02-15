const path = require('path');
const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const vendorDependencies =


module.exports = {
  devtool: 'source-map',
  plugins: [
    // new CleanWebpackPlugin([path.resolve(__dirname, 'public')], {
    //   root: process.cwd()
    // }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify('production') // eslint-disable-line
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: true
    //   }
    // })
  ]
};
