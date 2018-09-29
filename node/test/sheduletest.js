// var schedule = require('node-schedule');

// var j = schedule.scheduleJob('42 * * * *', function() {
//     console.log('The answer to life, the universe, and everything!');
// });


var schedule = require('node-schedule');

var j = schedule.scheduleJob('*/5 * * * *', function() {
    console.log('Today is recognized by Rebecca Black!' + new Date());
});