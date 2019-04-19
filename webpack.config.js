const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const version = process.env.npm_package_version;

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src/app.ts')
    },
    output: {
        filename: '[name].' + version + '.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name(file) {
                                if (process.env.NODE_ENV === 'development') {
                                    return '[path][name].[ext]';
                                }

                                return '[hash].[ext]';
                            },
                            outputPath: 'fonts'
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtract.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader'
                }],
                exclude: /node_modules/
            }]
    },
    resolve: {
        extensions: ['.less', '.ts']
    },
    plugins: [
        new MiniCssExtract({ filename: '[name].' + version + '.css' }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "./src/index.tpl.html")
        }),
        new EncodingPlugin('utf8')
    ]
}