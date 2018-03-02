console.log("i am global")
require("./layout.css")
// 引入font-awesome文件，需要按照font的实际路径引入，所以要在config中配置node_module中再配置个路径用来引入
require('node_modules/font-awesome/css/font-awesome.min.css');
// 引入公共部分footer
require('./footer/index.css');
