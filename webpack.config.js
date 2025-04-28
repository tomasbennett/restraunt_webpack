const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


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
        ]
    }

    
    ,mode: "production"

    ,resolve: {
        extensions: [".js", ".css", ".json", ".jsx", ".wasm", ".ts"]
    }

    ,devtool: "source-map"


    ,plugins: [
        new HtmlWebpackPlugin({
            template: "./src/Pages/HTML/index.html",
            filename: "index.html",
            inject: "body"
        })
    ]
};

module.exports = config;