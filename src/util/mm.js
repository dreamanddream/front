// 这里定义工具
var Hogan = require('hogan.js');
var conf = {
    serverHost : ''
};
// 自己封装一个aajax会更灵活，可以自己去封装一些东西。所以没有使用jquery原本的
var _mm = {
    request : function(param) {
        var _this=this;
        $.ajax({
            type:param.method || 'get',
            url:param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success : function (res){
                // 请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            err : function (err){
                typeof param.error === 'function' && param.error(res.msg);
            }
        })
    },
    // 统一登录处理
    doLogin : function(){
        // 这个写法？？？？？？？？
        // 让他跳转到登录页，为了避免每次都是跳到主页，所以传个参数，当前用户在哪个页面，登录成功时自动还在哪个页面，同时解决特殊字符串编码问题
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome : function(){
        window.location.href = './index.html';
    },
    // 获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
     // 获取url参数
     getUrlParam : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
        // console.log("result[2]"+result)
    },
    // 渲染html模板,需要安装hogan插件
    renderHtml : function(htmlTemplate, data){
        var template    = Hogan.compile(htmlTemplate),
            result      = template.render(data);
        return result;
    },
    // 成功提示
    successTips : function(msg){
        alert(msg || '操作成功！');
    },
    // 错误提示
    errorTips : function(msg){
        alert(msg || '哪里不对了~');
    },
    // 字段的验证，支持非空、手机、邮箱的判断
    validate : function(value, type){
        var value = $.trim(value);
        // 非空验证
        if('require' === type){
            return !!value;
            console.log("return"+!!value)
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    }
}
module.exports = _mm;