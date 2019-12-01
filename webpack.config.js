// plik konfiguracyjny WebPacka
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pages = ["main", "index"];
let multiplesFiles = pages.map(function(entryName) {
    return new HtmlWebpackPlugin({
      filename: entryName + '.html',
      template: __dirname + `/html/${entryName}.html`
   });
});

module.exports = {
    entry: {
        app: ['./src/js/app.js', './src/js/christmas.js', 
        './src/js/geolocation.js', './src/js/konami.js', 
        './src/js/sharedHandlers.js', './src/js/testAnimation.js', 
        './src/js/testApi.js', './src/js/cities.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'jsbundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
                "presets": ["@babel/preset-env"]
            }
          }
        },
        {
            test: /\.css$/,
            use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                },
                'css-loader',
              ],
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                }
              }
            ]
          }
      ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/html/index.html'
          }),
          // We need to set our desired filename for other html files though.
          new HtmlWebpackPlugin({
            filename: 'main.html',
            template: './src/html/main.html'
          })
    ]
};