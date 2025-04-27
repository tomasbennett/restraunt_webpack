const path = require("path");


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
                test: /\.tsx?$/,
                use: "ts-loader"
            }
        ]
    }

    
    ,mode: "development"

    ,resolve: {
        extensions: [".ts", ".js", ".json", ".jsx", ".wasm"]
    }


};

module.exports = config;