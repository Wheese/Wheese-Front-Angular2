// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var path = require('path');
// Webpack Plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin  = require('webpack/lib/DefinePlugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/*
 * Config
 */
module.exports = {
  resolve: {
    cache: false,
    extensions: ['', '.ts','.js','.json','.css','.html']
  },
  devtool: 'inline-source-map',
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [
          'node_modules'
        ]
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [
          'node_modules/rxjs'
        ]
      }
    ],
    loaders: [
      {
        test: /\.async\.ts$/,
        loaders: ['es6-promise-loader', 'ts-loader'],
        exclude: [ /\.(spec|e2e)\.ts$/ ]
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          "compilerOptions": {
            "noEmitHelpers": true,
            "removeComments": true,
          }
        },
        exclude: [ /\.e2e\.ts$/ ]
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/,  loader: 'raw-loader' }
    ],
    postLoaders: [
      // instrument only testing sources with Istanbul
      {
        test: /\.(js|ts)$/,
        include: 'src',
        loader: 'istanbul-instrumenter-loader',
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ],
    noParse: [
      'zone.js/dist',
      'angular2/bundles'
    ]
  },
  stats: { colors: true, reasons: true },
  debug: false,
  plugins: [
    new DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV)
      }
    })
  ],

  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },

  node: {
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
