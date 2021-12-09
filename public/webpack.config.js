const config = {
    entry: {
      index: "./public/index.js",
      html: "./public/index.html",
      css: "./public/styles.css",
      routes: "./routes/api.js",
    },
    output: {
      path: __dirname + "/dist",
      filename: "[name].bundle.js"
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        }
      ]
    }
  };
  module.exports = config;