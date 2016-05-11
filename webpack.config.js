var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: {
  	app: path.join(__dirname, 'www/js/app.js'),
  	controllers: path.join(__dirname, 'www/js/controllers.js'),
  	directives: path.join(__dirname, 'www/js/directives.js'),
  	services: path.join(__dirname, 'www/js/services.js'), 
  },
  output: { 
  	filename: '[name].js' 
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,	
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
};