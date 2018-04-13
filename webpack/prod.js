const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const base = require('./base.js');

const prod = webpackMerge(base, {
  entry: './src/index.jsx',

  plugins: [
    // Resolve global constant ENV to 'prod' during build
    new webpack.DefinePlugin({
      ENV: JSON.stringify('prod'),
    }),
  ],
});

module.exports = prod;
