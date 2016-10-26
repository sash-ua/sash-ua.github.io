const path = require("path"),
    webpack = require("webpack"),
    css = require("css-loader"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname + "/src/js",
    entry: {
        build: "./main"
    },
    resolve: {
        modulesDirectories: [
            "node_modules"
        ]
    },
    output: {
        path: __dirname + '/src/js',
        publicPath: '/js/',
        filename: 'build.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' }) }
        ]
    },
    plugins: [
        new ExtractTextPlugin("../sass/build.css")
    ]
};