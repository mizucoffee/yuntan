const path = require("path");
const merge = require("webpack-merge");

const common = {
  node: {
    __dirname: false,
    __filename: false
  },
  mode: process.env.ENV || "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: [/node_modules/]
      },
      {
        enforce: "pre",
        test: /\.ts$/,
        use: [
          {
            loader: "tslint-loader",
            options: {
              typeCheck: true,
              fix: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
};

module.exports = [
  merge(common, {
    target: "electron-main",
    entry: "./src/main/index.ts",
    output: {
      path: path.resolve(__dirname, "dist/main"),
      filename: "main.js"
    }
  }),
  merge(common, {
    target: "electron-renderer",
    entry: "./src/renderer/index.ts",
    output: {
      path: path.resolve(__dirname, "dist/renderer"),
      filename: "main.js"
    }
  })
];
