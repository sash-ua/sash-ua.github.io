const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dirAssets = path.join(__dirname, 'assets');

module.exports = merge(webpackConfig, {

    devtool: 'source-map',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        // publicPath: path.join(__dirname, 'dist')
    },

    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    module: {
        rules: [
            // CSS / SASS
            {
                test: /\.scss|.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: './'
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [dirAssets]
                        }
                    }
                ]
            }
        ]
    }
});
