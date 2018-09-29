    var moment = require('moment-timezone');
    const fs = require('fs');

    moment.tz.setDefault('Asia/Shanghai');

    var lastYearWeekValue = "";

    var year = moment().format('YYYY');
    var week = moment().format('WW');
    var repoName = "LiangYouRadioResource" + year + week;


    if (fs.existsSync('week.json')) {

        lastYearWeekValue = JSON.parse(fs.readFileSync('week.json', 'utf8')).week;

        console.log('week:' + week);
        console.log('lastYearWeekValue:' + lastYearWeekValue);

    } else {
        fs.writeFileSync('week.json', JSON.stringify({ "week": year + week }));
        lastYearWeekValue = year + week;
    }

    if ((year + week) !== lastYearWeekValue) {
        console.log('not the same week');
    }