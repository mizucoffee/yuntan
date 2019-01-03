const fs = require("fs-extra");
const path = require("path");
const merge = require("webpack-merge");
const legalEagle = require("legal-eagle");

legalEagle({ path: "./" }, (err, packagesLicenses) => {
  if (err) {
    throw new Error(err);
  } else {
    if (fs.pathExistsSync(path.join(__dirname, "./license.json")))
      fs.removeSync(path.join(__dirname, "./license.json"));
    fs.writeJsonSync("./license.json", packagesLicenses);
  }
});

const common = {
  node: {
    __dirname: false,
    __filename: false
  },
  mode: process.env.ENV || "development",
  module: {
    rules: [
      {
        type: "javascript/auto",
        test: /\.json$/,
        use: [{ loader: "json-loader" }]
      },
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
    modules: ["node_modules"],
    extensions: [".ts", ".js", ".json"]
  }
};

module.exports = [
  merge(common, {
    target: "electron-main",
    entry: "./src/main/index.ts",
    output: {
      path: path.resolve(__dirname, "dist/main"),
      filename: "index.js"
    }
  }),
  merge(common, {
    target: "electron-renderer",
    entry: "./src/renderer/index.ts",
    output: {
      path: path.resolve(__dirname, "dist/renderer"),
      filename: "index.js"
    }
  })
];
