const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { default: test } = require("node:test");


const config = {
    entry: "./src/index.js"

    ,output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        clean: true,
        assetModuleFilename: "./Media/Videos/[name].[hash].[ext]"
    }

    ,module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: ["ts-loader"]
            }
            ,{
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
            ,{
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    sources: {
                        list: [
                            {
                                tag: "source",
                                attribute: "src",
                                type: "src"
                            }
                        ]
                    }
                }
            }
        ]
    }

    ,mode: "development"

    ,resolve: {
        extensions: [".js", ".css", ".json", ".jsx", ".wasm", ".ts"]
    }

    ,plugins: [
        new CleanWebpackPlugin({}),
        new HtmlWebpackPlugin({
            template: "./src/Pages/HTML/index.html"
        })
    ]

};

module.exports = config;