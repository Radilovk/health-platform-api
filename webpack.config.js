const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    chunk: false
  },
  target: 'web',
  module: {
    rules: [
      { 
        test: /\.js$|\.jsx$,/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      { 
        test: /\\css$/,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader'
       ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  devtool: 'source-map',
  plugins: [
    new miniCssExtractPlugin()
  ]
};
