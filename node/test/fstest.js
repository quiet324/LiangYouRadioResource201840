const fs = require('fs');

// fs.writeFileSync('week.json', JSON.stringify({ "week": "201720" }));

if (fs.existsSync('week.json')) {
    // Do something
    var week = JSON.parse(fs.readFileSync('week.json', 'utf8'));

    console.log(week);
} else {
    fs.writeFileSync('week.json', JSON.stringify({ "week": "201720" }));

}

// fs.writeFile("week.json", JSON.stringify(data), function(err){
//   if(err){console.log(err);} else {console.log("archivo guardado..");}
// });