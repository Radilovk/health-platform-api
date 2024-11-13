const path = require('path');

module.exports = {
  mode: 'config',
  entry: './src/index.handler',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFormat: 'commonjs'
  },
  target: 'web',
  resolve: {
    espec:true,
  }
};