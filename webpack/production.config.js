const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseCfg = require('./development.config');

const delta = {
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader'
        }, {
          loader: 'sass-loader'
        }]
      })
    }]
  },

  plugins: [
    new ExtractTextPlugin('style.[contenthash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
};

let prodCfg = merge.smartStrategy({
  'module.rules.use': 'replace'
})(baseCfg, delta);

module.exports = prodCfg;
