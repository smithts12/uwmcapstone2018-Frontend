const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const contextPath = path.join(__dirname, 'src/client');
const outputPath = path.join(__dirname, 'dist');

module.exports = {
    context: contextPath,
    entry: ['./app.js'],
    output: {
        path: outputPath,
        filename: 'bundle.js'
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        open: true,
        historyApiFallback: true,
        stats: 'minimal',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|sass)$/,
                loader: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, '/client/src'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
                loader: 'file-loader?publicPath=/&name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ CONFIG: JSON.stringify(require('config')) }),
        new HtmlWebpackPlugin({
            title: 'Job Hunter',
            favicon: '../server/template/favicon.ico',
            template: '../server/template/index.html'
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](react.*)[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
};
