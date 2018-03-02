// var _mm=require("util/mm.js");
// _mm.request({
//     url:'http://happymmall.com/product/list.do?keyword=1',
//     success:function (res){
//         console.log(res)
//     },
//     error:function (errMsg) {
//         console.log(errMsg)
//     }
// })
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
// 引入nav-side/index.js中输出的navside
var navSide = require("page/common/nav-side/index.js");
var _mm = require('util/mm.js');
// 调用navside方法,注意这里要传一个对象，这个是让侧边栏active添加上
navSide.init({
    name : 'user-center'
})