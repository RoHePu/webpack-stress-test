const path = require("path");
const webpack = require("webpack");


module.exports = {
    entry: "./src",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].chunk.js"
    },
    plugins: [
        new webpack.ProgressPlugin()
    ]
}