const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    context: path.resolve('assets'),
    entry: ["./entry.js"],
    output: {
        path: path.resolve("build/"),
        publicPath:"/public/",
        filename: "bundle.js"
    },
    watch:true,
    plugins:[
        new ExtractTextPlugin("styles.css")
    ],

    devServer: {
        contentBase: 'public/html'
    },
    devtool:"source-map",
    module: {
        loaders: [
            {
              test: /\.css$/,
              exlude: /node_modules/,
              loader: ExtractTextPlugin.extract("style-loader","css-loader!postcss-loader")
            },
            {
                test:   /\.js/,
                loader: 'babel-loader',
                exlude: /node_modules/
            }
        ]
    },
    postcss: function (webpack) {
        return [
        require("postcss-import")({ addDependencyTo: webpack }),
        require("postcss-url")(),
        require("postcss-cssnext")(),
        // add your "plugins" here
        // ...
        // and if you want to compress,
        // just use css-loader option that already use cssnano under the hood
        require("postcss-browser-reporter")(),
        require("postcss-reporter")(),
        ]
    }
};