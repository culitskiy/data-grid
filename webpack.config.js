const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
console.log('isdev', isDev);

const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[contenthash].${ext}`);

const options = {
    exclude: 'node_modules',
    extensions: 'jsx',
    overrideConfigFile: '.eslintrc.json',
    // lintDirtyModulesOnly: true,
    emitError: true,
    emitWarning: true,
    // failOnError: false,
    failOnWarning: false,
    // outputReport: true,
    // quiet: true
};

const optimization = () => {
    let config = {};

    if (!isDev) {
        config = {
            splitChunks: {
                chunks: 'all',
            },
        };
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserWebpackPlugin(),
        ];
    }
    return config;
};

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: './public/index.html',
            minify: {
                collapseWhitespace: !isDev,
            },
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    globOptions: {
                        ignore: ["**/*.html"],
                    },
                    to: '',
                },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
        new ESLintPlugin(options),
    ];

    if (!isDev) {
        base.push(new BundleAnalyzerPlugin());
    }

    return base;
};

module.exports = {
    entry: {
        main: [
            '@babel/polyfill',
            './src/index.jsx',
        ],
    },
    mode: 'development',
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.jsx', '.js'],
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@data': path.resolve(__dirname, 'src/data'),
        },
        plugins: [
            new DirectoryNamedWebpackPlugin(true)
        ]
    },
    optimization: optimization(),
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // options: {
                        //     modules: true,
                        //   }
                    },
                    {
                        loader:  'css-loader',
                        // options: {
                        //     modules: {
                        //         localIdentContext: path.resolve(__dirname, "src"),
                        //         localIdentName: '[path]__[name]_[local]-[hash:base64:5]',
                        //     }
                        //   }
                    }
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader:  'css-loader',
                        options: {
                            modules: {
                                localIdentContext: path.resolve(__dirname, "src"),
                                localIdentName: '[path]__[name]_[local]-[hash:base64:5]',
                            }
                          }
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|jpeg|png|eot|ttf|otf|woff|woff2|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: '../',
                    },
                },
            },
            {
                test: /\.jsx/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    devServer: {
        contentBase: false,
        historyApiFallback: true,
        // host: '127.0.0.1',
        // port: 8080,
        clientLogLevel: 'debug',
    },
    devtool: isDev ? 'source-map' : false,
};
