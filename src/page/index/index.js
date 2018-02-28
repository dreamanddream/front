var _mm=require("util/mm.js");
_mm.request({
    url:'http://happymmall.com/product/list.do?keyword=1',
    success:function (res){
        console.log(res)
    },
    error:function (errMsg) {
        console.log(errMsg)
    }
})