const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
var baseWebpackConfig = require('./webpack.base.js')


module.exports = (env, argv) => {
    return merge(baseWebpackConfig(env, argv), {

        devtool: '#source-map',
        devServer: {
            contentBase: path.resolve(__dirname, '..', "dist")
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    })
}