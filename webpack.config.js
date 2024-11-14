// Updated Webpack Configuration
use strict; // Enable strict mode for better compilation
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    chunkFormat: 'array-push'
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\\(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*.webpack.config.js', *'.js', '*.jsx']
  }
};
