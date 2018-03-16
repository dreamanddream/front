
'use strict';
require('./index.css');
var _mm                 = require('util/mm.js');
var templatePagination  = require('./index.string');

// 定义构造函数，在js中应该是没有类的概念的
var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        // pageRange左右浮动的范围
        pageRange       : 3,
        onSelectPage    : null
    };
    // 事件的处理
    $(document).on('click', '.pg-item', function(){
        var $this = $(this);
        // 对于active和disabled按钮点击，不做处理
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        // _this.option.onSelectPage判断是不是函数，如果是就调用，如果不是就是null
        // 这里的option又是原型this.option = $.extend({}, this.defaultOption, userOption);
        // 这里的代码逻辑是层层嵌套的，onSelectPage是在list文件夹下index.js中定义的函数
        typeof _this.option.onSelectPage === 'function' 
            ? _this.option.onSelectPage($this.data('value')) : null;
    });
};
// 渲染分页组件，原型继承，这样new出来的方法也能继承
Pagination.prototype.render = function(userOption){
    // 合并选项，注意这种extend中第一个参数为{}，这样可以其他参数组件不变
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否为合法的jquery对象，这里面的写法也很高级
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    // 判断是否只有1页
    if(this.option.pages <= 1){
        return;
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml());
};
// 获取分页的html, |上一页| 2 3 4 =5= 6 7 8|下一页|  5/9
Pagination.prototype.getPaginationHtml = function(){
    var html        = '',
        option      = this.option,
        pageArray   = [],
        // 处理分页的初始值
        start       = option.pageNum - option.pageRange > 0 
            ? option.pageNum - option.pageRange : 1,
            // 处理分页的末值
        end         = option.pageNum + option.pageRange < option.pages
            ? option.pageNum + option.pageRange : option.pages;
    // 上一页按钮的数据
    pageArray.push({
        name : '上一页',
        // 获取值，上一页的值
        value : this.option.prePage,
        // 是否禁用
        disabled : !this.option.hasPreviousPage
    });
    // 数字按钮的处理，就是显示出来的数值
    for(var i = start; i <= end; i++){
        pageArray.push({
            name : i,
            value : i,
            active : (i === option.pageNum)
        });
    };
    // 下一页按钮的数据
    pageArray.push({
        name : '下一页',
        value : this.option.nextPage,
        disabled : !this.option.hasNextPage
    });
    html = _mm.renderHtml(templatePagination, {
        pageArray   : pageArray,
        pageNum     : option.pageNum,
        pages       : option.pages
    });
    return html;
};

module.exports = Pagination;