var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = {
    // entry: './src/page/index/app.js',
    // 处理多入口
    entry: {
        'common': ['./src/page/common/index.js'], // 如果直接这样写会打包成common.js文件，而没有办法放到base.js中，所以要将name改为common
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js']
    },
    // 入口文件是多个，输出文件也要是多个，否则会覆盖
    output: {
        path: './dist',
        // filename支持[name]这种写法,同时要想设置js文件在js文件夹下可以加上路径
        filename: 'js/[name].js'
        // filename: 'app.js'
    },
    // 模块化jquery
    externals : {
        'jquery' : 'window.jQuery'
    },
    // css的loader
    module: {
        loaders: [
            
                // 检测到以.css为结尾的文件就使用style-loader!css-loader
                // test:/\.css$/, loader: "style-loader!css-loader"
                // test:/\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")
            
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") }
        ]
        // rules: [{
        //     test: /\.css$/,
        //     use: ExtractTextPlugin.extract({
        //         fallback: "style-loader",
        //         use: ["style-loader","css-loader"]
        //     })
        // }]
    },
    // 公共部分
    plugins: [
        // 要引入webpack
        new webpack.optimize.CommonsChunkPlugin({
            // name : 'commons',
            name: 'common', // 注意这里是配合ertry中common的
            // 所有的生成文件都是在path路径中定义的dist文件夹下
            filename : 'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css") // 和编译打包js方法类似，只不过这里引入了插件
    ]
};
module.exports = config;