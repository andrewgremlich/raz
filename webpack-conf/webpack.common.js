const path = require('path');

module.exports = {
  entry: './static/scripts/main.js',
  output: {
    filename: '../static/main.bundle.js',
    path: path.resolve(__dirname)
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  }
};
