// a blueprint file for the way webpack should behave within our project

const path = require("path");
const webpack = require("webpack");

// the main configuration object - add options within this object that tell webpack what to do

module.exports = {
    entry: "./assets/js/script.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.bundle.js"
    },
    // need to tell webpack to use the jQuery plugin
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ],
    mode: "development"
};