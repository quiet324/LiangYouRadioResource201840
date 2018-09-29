var moment = require('moment');

var year = moment().format('YYYY');
var week = moment().format('WW');

console.log(year);
console.log(week);
console.log(moment().unix());