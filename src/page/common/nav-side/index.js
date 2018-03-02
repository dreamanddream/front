/*
* @Author: Rosen
* @Date:   2017-05-19 17:39:14
* @Last Modified by:   Rosen
* @Last Modified time: 2017-05-24 16:46:02
*/
'use strict';
require('./index.css');
var _mm             = require('util/mm.js');
// 定义模板数据，在当前文件夹下创建index.string
var templateIndex   = require('./index.string');
// 侧边导航
var navSide = {
    // 将以下内容动态渲染进nav-side.html中
    option : {
        name : '',
        navList : [
            {name : 'user-center', desc : '个人中心', href: './user-center.html'},
            {name : 'order-list', desc : '我的订单', href: './order-list.html'},
            {name : 'user-pass-update', desc : '修改密码', href: './user-pass-update.html'},
            {name : 'about', desc : '关于MMall', href: './about.html'}
        ]
    },
    init : function(option){
        // 合并选项 $.extend两个参数都是对象，extend是一个浅拷贝
        $.extend(this.option, option);
        // console.log("ss"+ss);
        this.renderNav();
    },
    // 渲染导航菜单
    renderNav : function(){
        // 计算active数据
        for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        };
        // 渲染list数据，使用mm.js中renderHtml()方法 ,templateIndex是上面定义的模板数据
        var navHtml = _mm.renderHtml(templateIndex, {
            navList : this.option.navList
        });
        // 把html放入容器
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;