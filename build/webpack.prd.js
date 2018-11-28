const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var baseWebpackConfig = require('./webpack.base.js')


module.exports = (env, argv) => {
    return merge(baseWebpackConfig(env, argv), {
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ],
        optimization: {
            minimize: true
        }
    })
}