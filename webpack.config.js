const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin")



module.exports = (env, argv) => {
    console.log('*************************');
    console.log(argv.mode);
    console.log('*************************');
    return {
        entry: './src/app/index.js',
        output: {
            filename: 'bundle.[hash].js',
            path: path.resolve(__dirname, 'dist')
        },
        devtool: 'inline-source-map',
        plugins: [
            new CopyWebpackPlugin([
                {
                    from:path.resolve(__dirname,'config',argv.mode+'.config.json'),
                    to:  path.resolve(__dirname,'dist','app.config.json')
                }
            ]),
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                title: 'ai robort',
                template: './public/index.html',
            }),
            new ExtractTextPlugin("styles/style.[hash].css")
            // new BundleAnalyzerPlugin()
            
        ],
        resolve: {
            alias: {
                // '@config$': path.join(__dirname, '..','..','config/'+argv.mode+'.json'),
                'vue$': 'vue/dist/vue.esm.js',
            }
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            'css-loader',
                            'sass-loader'
                        ]
                    })
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
                        name: 'assets/img/[name].[hash].[ext]'
                    }
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            'scss': ExtractTextPlugin.extract({ //lang属性对应的名称
                                use: [
                                    // 'vue-style-loader',//首先给vue的样式loader过滤一遍
                                    'css-loader', //css-loader,把css转js
                                    'sass-loader' //用sass编译
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