var path = require("path")
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:["./src/index.tsx"],
    output:{
        path:path.join(__dirname,"build/dist"),
        filename:"bundle.js",
    },
    devServer:{
        contentBase : path.join(__dirname,"build/dist"),
        compress: true,
        port: 9000,
        stats:"errors-only"
    },
    mode:"development",
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Custom template',
          minify:{
            collapseWhitespace:true
          },
          //hash:true,
          template: 'public/index.html'
        })
    ],
    resolve:{
        extensions:[".tsx",".ts",".js"]
    },
    module: {
        rules: [
          {
            test: /\.tsx$/,
            loader: "ts-loader",
            exclude: /node_modules/
          },
          {
              test:/\.scss$/,
              use:["style-loader","css-loader","sass-loader"]
          }
        ]
    }
}

