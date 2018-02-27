var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 封装处理模板的函数，获取webpack-pluginin参数的方法
var getHtmlConfig = function (name) {
    return {
        template : './src/view/'+name+'.html', // 将index替换成了name
        filename : 'view/'+name+'.html',
        inject : true,
        hash : true,
        // 将commonjs和index.js也打包到index.html中
        chunks : ['common',name]
    }
}
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
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            // 图片，还有使用的fontsome的字体等的处理loader 配置   url-loader后的limit限制图片大小，当文件小于100会以base64形式存在，当文件大于100会以源文件形式存在。同时将文件放到resource下，name表示原图片名字，ext保留拓展名
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
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
        // 独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            // name : 'commons',
            name: 'common', // 注意这里是配合ertry中common的
            // 所有的生成文件都是在path路径中定义的dist文件夹下
            filename : 'js/base.js'
        }),
        // 将css单独打包
        new ExtractTextPlugin("css/[name].css"),// 和编译打包js方法类似，只不过这里引入了插件
        // html模板的处理
        // 如果有很多个页面模板，这样一个个去写不够简洁，所以封装一个函数
        // new HtmlWebpackPlugin({
        //     // html原始模板
        //     template : './src/view/index.html',
        //     filename : 'view/index.html',
        //     inject : true,
        //     hash : true,
        //     // 将commonjs和index.js也打包到index.html中
        //     chunks : ['common','index']
        // })
        // 使用函数方法
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))

    ]
};
module.exports = config;