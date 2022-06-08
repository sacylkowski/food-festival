// a blueprint file for the way webpack should behave within our project
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const webpack = require("webpack");

// the main configuration object - add options within this object that tell webpack what to do

module.exports = {
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        tickets: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js"
    },
    output: {
        // filename is using the key from the entry points
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    // need to tell webpack to use the jQuery plugin
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",  // the report outputs to an HTML file in the dist folder
        })
    ],
    mode: "development"
};