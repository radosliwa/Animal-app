var path = require('path');

module.exports = {
  entry: './app/assets/scripts/script.js',
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, './app/temp/scripts')
  },
  module: {
    loaders:[
      {
        loader: 'babel-loader',
        query: {
          presets:['es2015']
        },
        test:/\.js$/,
        exclude:/node_modules/
      }
    ]
  }
};
