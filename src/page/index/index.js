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
// banner轮播，引入slider
require('util/slider/index.js')
// 引入banner模板
var templateBanner= require('./banner.string')
// 引入nav-side/index.js中输出的navside
var navSide = require("page/common/nav-side/index.js");
var _mm = require('util/mm.js');
// 调用navside方法,注意这里要传一个对象，这个是让侧边栏active添加上
navSide.init({
    name : 'user-center'
})
// 初始化banner
$(function() {
    // 使用hogan渲染，同时填充页面,这里还有个问题要注意，如果没有需要渲染的数据，而是希望出现整个html可以只传递一个参数
    var bannerHtml=_mm.renderHtml(templateBanner);
    console.log(bannerHtml)
    // 刚开始页面加载loading，然后js加载完成，完成渲染后会将loading替换成对应的banner轮播
    $(".banner-con").html(bannerHtml);
    // unslider初始化
    var slider = $('.banner').unslider({
        dots: true
    });
    // 前一个和后一个事件绑定
    var unslider = $('.banner').unslider();
    $('.banner-con .banner-arrow').click(function() {
        var forward = $(this).hasClass('prev')?'prev':'next';
        // 这里的[forward]就代表文档里的[fn]
        slider.data('unslider')[forward]();
        //  Either do unslider.data('unslider').next() or .prev() depending on the className
        
    });
})