// var schedule = require('node-schedule');

// var j = schedule.scheduleJob('42 * * * *', function() {
//     console.log('The answer to life, the universe, and everything!');
// });


var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(4, 6)];
rule.hour = [new schedule.Range(0, 23)];
rule.minute = 20;

var j = schedule.scheduleJob(rule, function() {
    console.log('Today is recognized by Rebecca Black!' + new Date());
});