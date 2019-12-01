// plik konfiguracyjny WebPacka
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: [ 
      "./src/js/app.js",
      "./src/js/christmas.js",
      "./src/js/geolocation.js",
      "./src/js/konami.js",
      "./src/js/sharedHandlers.js",
      "./src/js/testApi.js",
      // './src/js/cities.js',
      "./src/css/basic.css",
      "./src/css/main.css",
      "./src/css/search.css",
      "./src/css/fontello/css/fontello.css"
    ],
    main: [ 
      "./src/js/app.js",
      "./src/js/christmas.js",
      "./src/js/geolocation.js",
      "./src/js/konami.js",
      "./src/js/sharedHandlers.js",
      "./src/js/testAnimation.js",
      "./src/js/testApi.js",
      // './src/js/cities.js',
      "./src/css/search.css",
      "./src/css/basic.css",
      "./src/css/main.css",
      "./src/css/fontello/css/fontello.css"
    ],
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      { test: /\.svg$/, loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=font/[name].[ext]' },
      { test: /\.woff$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=font/[name].[ext]' },
      { test: /\.woff2$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=font/[name].[ext]' },
      { test: /\.[ot]tf$/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=font/[name].[ext]' },
      { test: /\.eot$/, loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=font/[name].[ext]' }
 
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ['app'],
      template: "./src/html/index.html"
    }),
    // We need to set our desired filename for other html files though.
    new HtmlWebpackPlugin({
      filename: "main.html",
      chunks: ['main'],
      template: "./src/html/main.html"
    })
  ]
};
