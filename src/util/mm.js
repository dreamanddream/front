// 这里定义工具
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
        // 让他跳转到登录页，为了避免每次都是跳到主页，所以传个参数，同时解决特殊字符串编码问题
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome : function(){
        window.location.href = './index.html';
    }
}
module.exports = _mm;