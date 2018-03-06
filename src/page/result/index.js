/*
* @Author: Rosen
* @Date:   2017-05-19 21:52:46
* @Last Modified by:   Rosen
* @Last Modified time: 2017-05-19 23:01:25
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
// 通过接受的参数进行提示，$(function (){}整个页面加载完成后执行)
$(function(){
    // 这里的type是页面中url中的值？type=register
    // 通过使用getUrlParam('')方法获取url地址中的type后面的值，如果没有就传default，显示操作成功
    var type = _mm.getUrlParam('type') || 'default';
   console.log("type"+type)
    // 找到对应的元素进行渲染
        // $element = $('.' + type + '-success');
        var element=$('.' + type + '-success')
    // 显示对应的提示元素
        element.show();
})