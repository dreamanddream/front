'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');

var page = {
    // 加载数据需要用到的参数
    data : {
        listParam : {
            keyword         : _mm.getUrlParam('keyword')    || '',
            // 得到categoryId
            categoryId      : _mm.getUrlParam('categoryId') || '',
            // 排序方式
            orderBy         : _mm.getUrlParam('orderBy')    || 'default',
            // 直接跳转到第几页，默认为1
            pageNum         : _mm.getUrlParam('pageNum')    || 1,
            pageSize        : _mm.getUrlParam('pageSize')   || 10
        }
    },
    // 初始化首先调用onLoad和bindEvent
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        // 排序的点击事件
        $('.sort-item').click(function(){
            // 将$(this)放置到变量中，下次用直接取，属于优化的一方面
            var $this = $(this);
            // 每当点击排序页码都是1
            _this.data.listParam.pageNum = 1;
            // 点击默认排序，首先判断type类型是什么
            console.log()
            if($this.data('type') === 'default'){
                // 已经是active样式
                if($this.hasClass('active')) {
                    return;
                }
                // 其他
                else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                        // 同时设置参数排序方式是默认的
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            // 这里的降序和升序功能是后台实现，前端只是将排序参数传递给后台
            else if($this.data('type') === 'price'){
                // active class 的处理
                $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                // 升序、降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表，根据排序和分页的改变也要重新加载列表内容
            _this.loadList();
        });
    },
    // 加载list数据
    loadList : function(){
        var _this       = this,
            listHtml    = '',
            // 得到整个listParam对象中的信息
            listParam   = this.data.listParam,
            $pListCon   = $('.p-list-con');
            // 请求前先加载loading，一旦成功就加载内容
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段，就是要么直接使用keyword，要么使用categoryId，没必要两个都存在。deletd可以直接这样使用？
        listParam.categoryId 
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口，拿到list数据
        _product.getProductList(listParam, function(res){
            listHtml = _mm.renderHtml(templateIndex, {
                // 渲染时data是对象，就是将请求到的数据渲染出来
                list :  res.list
            });
            $pListCon.html(listHtml);
            // 上面内容是渲染数据，下面内容是分页相关
            // 以下是后台返回的分页数据
            // 数据请求成功，调用分页内容
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        // 严谨的思维逻辑，如果有paginnation就不再new一个了，执行空，如果没有就new一个
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                // 每点击一次分页相当于又重新加载一次页面
                _this.loadList();
            }
        }));
    }
};
$(function(){
    page.init();
})