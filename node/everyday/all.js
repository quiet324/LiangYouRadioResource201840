const Xray = require('x-ray');
const x = Xray();
const fs = require('fs');
const download = require('download');
var shell = require('shelljs');
var dateFormat = require('dateformat');
var async = require('async');
var downloadFileSync = require('download-file-sync');
var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(4, 6)];
rule.hour = [0, 1, 6, 9, 14, 17, 21];
rule.minute = 5;


var mkdirp = require('mkdirp');


// var moment = require('moment');
var moment = require('moment-timezone');

moment.tz.setDefault('Asia/Shanghai');

var taskRunningTimes = 1;

// var j = schedule.scheduleJob('0 * * * * *', function() { // "Runs job every minute"

// var j = schedule.scheduleJob('*/5 * * * *', function() { // "Runs job every 5 minute"
var j = schedule.scheduleJob(rule, function() { // every hour at 5 minutes

    // var j = schedule.scheduleJob('0 5 * * * *', function() { // // "Runs job every 5 minute"
    // var j = schedule.scheduleJob('0 0 * * * *', function() { //// "Runs job every hour"
    var now = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(now + ' taskRunningTimes:' + taskRunningTimes++);
    var results = JSON.parse(fs.readFileSync('../../artist.json', 'utf8'));
    results.forEach(function(artist) {

        if (artist.id == 49) { // 空中门训
            return;
        }
        x('http://txly2.net/' + artist.shortName, 'tbody tr', {
                "time": '.ss-title a',
                "title": '.ss-title p',
                "downUrl": '.ss-dl a@href'
            })
            // .write('results.json')
            (function(err, audio) {

                if (err === null) {
                    var index = audio.downUrl.indexOf('?');
                    var sub = audio.downUrl.substring(0, index);
                    var lastIndex = audio.downUrl.lastIndexOf('/');
                    var fileName = sub.substring(lastIndex + 1);
                    audio.downUrl = sub;
                    audio.time = audio.time.substring(audio.time.lastIndexOf('-') + 1);
                    console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + artist.name + audio.time)
                        // var today = dateFormat(new Date(), "yyyymmdd");
                    var today = moment().format("YYYYMMDD");
                    if (audio.time === today) {
                        var file = '../../' + artist.shortName + '/' + fileName;

                        if (!fs.existsSync(file)) { //
                            // Do something

                            console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + "downloading..." + file);

                            var data = require('child_process').execFileSync('curl', ['--silent', '-L', audio.downUrl]);
                            // var data = downloadFileSync(audio.downUrl)

                            mkdirp.sync('../../' + artist.shortName);

                            fs.writeFileSync('../../' + artist.shortName + '/' + fileName, data);

                            var commitTag = artist.shortName + audio.time

                            var year = moment().format('YYYY');
                            var week = moment().format('WW');

                            audio.duration = artist.duration;
                            audio.size = artist.size;
                            audio.artistId = artist.id;
                            audio.artistName = artist.name;
                            audio.path = "https://rawcdn.githack.com/quiet324/LiangYouRadioResource" + year + week + "/" + commitTag + "/" + artist.shortName + "/" + fileName;
                            audio.id = artist.id * 1000000 + parseInt(audio.time.substring(2), 10);

                            fs.writeFileSync("./" + artist.shortName + audio.time + ".json", JSON.stringify(audio, null, '\t'));

                            if (!shell.which('git')) {
                                shell.echo('Sorry, this script requires git');
                                shell.exit(1);
                            }

                            if (shell.exec('git add ../../.').code !== 0) {
                                shell.echo('Error: Git add failed');
                                shell.exit(1);
                            }

                            if (shell.exec('git commit -m "Auto-commit"').code !== 0) {
                                shell.echo('Error: Git commit failed');
                                shell.exit(1);
                            }

                            if (shell.exec('git tag ' + artist.shortName + audio.time).code !== 0) {
                                shell.echo('Error: Git tag failed');
                                shell.exit(1);
                            }

                            if (shell.exec('git push').code !== 0) {
                                shell.echo('Error: Git push failed');
                                shell.exit(1);
                            }

                            if (shell.exec('git push --tags').code !== 0) {
                                shell.echo('Error: Git push tags failed');
                                shell.exit(1);
                            }



                        } else {
                            console.log(file + " exit");
                        }


                    }

                }
            });
    });

});