// var schedule = require('node-schedule');

// var j = schedule.scheduleJob('42 * * * *', function() {
//     console.log('The answer to life, the universe, and everything!');
// });


var schedule = require('node-schedule');


// "Runs job every minute"
var j = schedule.scheduleJob('0 * * * * *', function() {
    console.log('Today is recognized by Rebecca Black!' + new Date());
});