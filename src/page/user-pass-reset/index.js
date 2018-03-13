
require('./index.css');
require('page/common/nav-simple/index.js');
var _user   = require('service/user-service.js');
var _mm     = require('util/mm.js');

// 表单里的错误提示
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
    data : {
        username    : '',
        question    : '',
        answer      : '',
        token       : ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsername();
    },
    bindEvent : function(){
        var _this = this;
        // 输入用户名后下一步按钮的点击
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            // 用户名存在
            if(username){
                _user.getQuestion(username, function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    console.log("忘记密码中的res含义"+res)
                    _this.loadStepQuestion();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 用户名不存在
            else{
                formError.show('请输入用户名');
            }
        });
        // 输入密码提示问题答案中的按钮点击
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            // 密码提示问题答案存在
            if(answer){
                // 检查密码提示问题答案
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer
                }, function(res){
                    _this.data.answer   = answer;
                    // 这里还要加载token，注意这个页面的res，核实用户名，提示问题，以及答案要有一个token，这个是后台返回的token
                    _this.data.token    = res;
                    _this.loadStepPassword();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 用户名不存在
            else{
                formError.show('请输入密码提示问题答案');
            }
        });
        // 输入新密码后的按钮点击
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            // 密码不为空
            if(password && password.length >= 6){
                // 检查密码提示问题答案
                _user.resetPassword({
                    username        : _this.data.username,
                    passwordNew     : password,
                    // 将上次后台返回的token带过去
                    forgetToken     : _this.data.token
                }, function(res){
                    // 在操作结果提示页会根据这里的url进行对应结果的显示
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 密码为空
            else{
                formError.show('请输入不少于6位的新密码');
            }
        });
        
    },
    // 加载输入用户名的一步
    loadStepUsername : function(){
        $('.step-username').show();
    },
    // 加载输入密码提示问题答案的一步
    loadStepQuestion : function(){
        // 清除错误提示
        formError.hide();
        // 做容器的切换
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    // 加载输入password的一步
    loadStepPassword : function(){
        // 清除错误提示
        formError.hide();
        // 做容器的切换
        $('.step-question').hide()
            .siblings('.step-password').show();
    }
    
};
$(function(){
    page.init();
});