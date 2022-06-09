// a blueprint file for the way webpack should behave within our project
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpack = require("webpack");
const path = require("path");

// the main configuration object - add options within this object that tell webpack what to do

const config = {
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        tickets: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js"
    },
    output: {
        // filename is using the key from the entry points
        path: path.join(__dirname + "/dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            // adding an object to the rules array.  This will identify the type of files to pre-process using the test property to find a regex
            {
                test: /\.jpg$/i,
                use: [
                    {
                        loader: "file-loader",
                        // the default behavior of file-loader is that a file will be treated as an ES5 module
                        // paths to images might be formatted incorrectly, so we pass esModule: false to prevent this
                        options: {
                            esModule: false,
                            name (file) {
                                return "[path][name].[ext]"
                            },
                            publicPath: function(url) {
                                return url.replace("../", "/assets/")
                            }
                        }
                    },
                    {
                        loader: "image-webpack-loader"
                    }
                ]
            }
        ]
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

module.exports = config;