var moment = require('moment-timezone');

moment.tz.setDefault('Asia/Shanghai');


var today = moment().format("YYYYMMDD");


console.log(today);