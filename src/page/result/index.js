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
    var type        = _mm.getUrlParam('type') || 'default',
    // 找到对应的元素进行渲染
        $element    = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})