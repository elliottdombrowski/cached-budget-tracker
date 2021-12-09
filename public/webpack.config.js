const config = {
    entry: {
      index: "index.js",
      routes: "../routes/api.js",
      register: "service-worker-register.js",
      worker: "service-worker.js",
      indexdb: "indexdb.js"
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