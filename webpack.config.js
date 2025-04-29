const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


const config = {
    entry: "./src/index.js"

    ,output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        clean: true
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
                use: ["html-loader"]
            }
        ]
    }

    ,mode: "production"

    ,resolve: {
        extensions: [".js", ".css", ".json", ".jsx", ".wasm", ".ts"]
    }

    ,devtool: false

    ,plugins: [
        new CleanWebpackPlugin({}),
        new HtmlWebpackPlugin({
            template: "./src/Pages/HTML/index.html"
        })
    ]

};

module.exports = config;