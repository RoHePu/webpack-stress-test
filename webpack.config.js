const path = require("path");
const webpack = require("webpack");


module.exports = {
    entry: "./src",
    devtool: "cheap-eval-source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].chunk.js"
    },
    plugins: [
        new webpack.ProgressPlugin()
    ]
}