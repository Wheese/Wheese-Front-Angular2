var path = require('path');
var webpack = require('webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var HMR = process.argv.join('').indexOf('hot') > -1;

var metadata = {
  title:      'Projet',
  baseUrl:    '/',
  host:       'localhost',
  port:       3000,
  serverHost: 'localhost',
  serverPort: 9000,
  ENV:        ENV,
  HMR:        HMR
};

/*
 * Config
 */
module.exports = {
  // static data for index.html
  metadata: metadata,
  // for faster builds use 'eval'
  devtool: 'source-map',
  debug: true,

  entry: { 'polyfills': './src/polyfills.ts', 'main': './src/main.ts' },

  // Config for our build files
  output: {
    path: 'dist',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['', '.ts','.js','.json','.css','.html']
  },

  module: {
    preLoaders: [
      { test: /\.js$/, loader: "source-map-loader", exclude: [ 'node_modules/rxjs' ] }
    ],
    loaders: [
      // Support Angular 2 async routes via .async.ts
      { test: /\.async\.ts$/, loaders: ['es6-promise-loader', 'ts-loader'], exclude: [ /\.(spec|e2e)\.ts$/ ] },

      // Support for .ts files.
      { test: /\.ts$/, loader: 'ts-loader', exclude: [ /\.(spec|e2e|async)\.ts$/ ] },

      { test: /\.scss$/,  loaders: ["style", "css", "sass"] },

      // Support for *.json files.
      { test: /\.json$/,  loader: 'json-loader' },

      // Support for CSS as raw text
      { test: /\.css$/,   loader: 'raw-loader' },

      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw-loader', exclude: [ 'src/index.html' ] },

      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"}
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: 'polyfills', filename: 'polyfills.bundle.js', minChunks: Infinity }),
    // static assets
    new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ]),
    // generating html
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    // replace
    new webpack.DefinePlugin({
      'process.env': {
        'ENV':          JSON.stringify(metadata.ENV),
        'NODE_ENV':     JSON.stringify(metadata.ENV),
        'SERVER_HOST':  JSON.stringify(metadata.serverHost),
        'SERVER_PORT':  JSON.stringify(metadata.serverPort),
        'HMR': HMR
      }
    })
  ],

  // Other module loader config
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },
  // our Webpack Development Server config
  devServer: {
    port: metadata.port,
    host: metadata.host,
    // contentBase: 'src/',
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    outputPath: 'dist'
  },
  // we need this due to problems with es6-shim
  node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
};
