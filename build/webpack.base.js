const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin")



module.exports = (env, argv) => {
    console.log(__dirname);
    extraPlugin = [];
    if (!((require('../config/' + argv.mode + '.config.json')).useSprite)) {
        extraPlugin.push(new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '..', 'static'),
            to: path.resolve(__dirname, '..', 'dist', 'static')
        }]))
    }
    return {
        entry: path.resolve(__dirname, '../src/app/index.js'),
        output: {
            filename: 'bundle.[hash:7].js',
            path: path.resolve(__dirname, '..', 'dist')
        },
        plugins: [
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, '..', 'config', argv.mode + '.config.json'),
                to: path.resolve(__dirname, '..', 'dist', 'app.config.json')
            }]),
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                title: 'ai robort',
                template: path.resolve(__dirname, '../public/index.html'),
            }),
            new ExtractTextPlugin("styles/style.[hash:7].css"),
            ...extraPlugin
        ],
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
            }
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /(\.css|\.scss)$/,
                    exclude: path.resolve(__dirname, '..', 'node_modules/font-awesome'),
                    use: ExtractTextPlugin.extract({
                        use: [
                            'css-loader',
                            'sass-loader'
                        ]
                    })
                },
                {
                    test: /(\.css)$/,
                    include: path.resolve(__dirname, '..', 'node_modules/font-awesome'),
                    loader: 'style-loader!css-loader!sass-loader'
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src']
                    }
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'assets/img/[name].[hash:7].[ext]'
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            'scss': ExtractTextPlugin.extract({ 
                                use: [
                                    'css-loader', 
                                    'sass-loader' 
                                ],
                                fallback: 'vue-style-loader'
                            })
                        }
                    }
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        }
    }
}