// var schedule = require('node-schedule');

// var j = schedule.scheduleJob('42 * * * *', function() {
//     console.log('The answer to life, the universe, and everything!');
// });


var schedule = require('node-schedule');

// "Runs job every 5 hour"
// var j = schedule.scheduleJob('0 0 5 * * *', function() {
var j = schedule.scheduleJob('0 5 * * * *', function() { // // "Runs job every 5 minute"

    console.log('Today is recognized by Rebecca Black!' + new Date());
});