// a blueprint file for the way webpack should behave within our project
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpack = require("webpack");
const WebpackPwaManifest = require("webpack-pwa-manifest");
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
        }),
        new WebpackPwaManifest({
            name: "Food Event",
            short_name: "Foodies",
            description: "An app that allows you to view upcoming food events.",
            start_url: "../index.html",
            background_color: "#01579b",
            theme_color: "#ffffff",
            // fingerprints and inject and specific to the manifest plugin.  Fingerprints tell webpack whether or not it should
            // generate unique fingerprints so that each time a new manifest is generated
            // inject detemines whether the link to the manifest.json is added to the HTML, because we aren't using fingerprints,
            // we can also set inject to be false
            fingerprints: false,
            inject: false,
            icons: [{
                src: path.resolve("assets/img/icons/icon-512x512.png"),
                // the sizes property will create icons with the dimensions of the numbers provided
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join("assets", "icons")
            }]
        })
    ],
    mode: "development"
};

module.exports = config;