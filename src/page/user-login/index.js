/*
* @Author: Rosen
* @Date:   2017-05-08 22:26:19
* @Last Modified by:   Rosen
* @Last Modified time: 2017-05-21 22:36:14
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
// 登录接口
var _user   = require('service/user-service.js');
var _mm     = require('util/mm.js');

// 封装方法：统一使用表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// page 逻辑部分
var page = {
    init: function(){
        this.bindEvent(); // this的含义？？？？？？？？
    },
    bindEvent : function(){
        var _this = this;
        // 登录按钮的点击
        $('#submit').click(function(){
            _this.submit();
        });
        // 如果按下回车，也进行提交
        $('.user-content').keyup(function(e){
            // keyCode == 13 表示回车键
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    // 提交表单
    submit : function(){
        // 定义变量获取用户名和密码
        var formData = {
                username : $.trim($('#username').val()),
                password : $.trim($('#password').val())
            },
            // 表单验证结果，将表单验证也单独抽离出来，将formValidate()函数执行的结果赋值给一个变量
            validateResult = this.formValidate(formData);
        // 验证成功，根据返回的信息进行验证决定是否提交
        if(validateResult.status){
            // 验证通过后进行提交
            // _user接口变量名，login是在接口中定义的方法
            _user.login(formData, function(res){
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // 验证失败
        else{
            // 错误提示
            formError.show(validateResult.msg);
        }
    },
    // 表单字段的验证
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
// 调用方法
$(function(){
    page.init();
});