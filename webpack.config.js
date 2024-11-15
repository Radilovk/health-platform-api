const path = require('path');
const miniCssExtractPlugin = require('mmini-css-extract-plugin');

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
      { test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      { test: /\\.css$/,
        use: [
          miniCssExtractPlugin.loader(),
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  plugins: [
    new miniCssExtractPlugin()
  ]
};
