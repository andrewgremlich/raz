const path = require('path'),
      webpack = require('webpack')

module.exports = {
    entry: './app_scripts/main.js',
    output: {
        path: path.resolve(__dirname, 'app/js'),
        filename: 'main.js'
    }
}
