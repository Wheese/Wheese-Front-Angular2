var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
var CompressionPlugin = require('compression-webpack-plugin');
var WebpackMd5Hash    = require('webpack-md5-hash');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

var ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 80;

var metadata = {
  title:      'Projet',
  baseUrl:    '/',
  host:       HOST,
  port:       PORT,
  serverHost: 'localhost',
  serverPort: 9000,
  ENV:        ENV
};

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',
  debug: false,

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },

  htmlLoader: {
    minimize: false
  },

  plugins: [
    new ForkCheckerPlugin(),
    new WebpackMd5Hash(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new OccurenceOrderPlugin(true),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV),
        'SERVER_HOST':  JSON.stringify(metadata.serverHost),
        'SERVER_PORT':  JSON.stringify(metadata.serverPort)
      }
    }),
    new CompressionPlugin({
      regExp: /\.css$|\.html$|\.js$|\.map$/,
      threshold: 2 * 1024
    })
  ],

});
