require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm             = require('util/mm.js');
var _order           = require('service/order-service.js');
var templateProduct   = require('./product-list.string');
var templateAddress   = require('./address-list.string');
var page={}