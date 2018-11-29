var path = require('path');

module.exports = {
  entry: {
    App:'./app/assets/scripts/script.js',
    Vendor:'./app/assets/scripts/vendor.js'
  },
  output: {
    filename: '[name].js',
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
