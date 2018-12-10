var path = require('path');

module.exports = {
  entry: {
    App:['@babel/polyfill','./app/assets/scripts/script.js'],
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
          presets:['env']
        },
        test:/\.js$/,
        exclude:/node_modules/
      }
    ]
  }
};
