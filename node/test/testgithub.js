var shell = require('shelljs');

//  curl -u "$username:$token" https://api.github.com/user/repos -d '{"name":"'$repo_name'"}'
// https://github.com/quiet324/testcreate.git


var repoName = "testcreate12";

if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}

// var createReops = "curl -u 'quiet324:$token' https://api.github.com/user/repos -d '{\"name\":\"\'" + repoName + "\'\"}' ";

// if (shell.exec(createReops).code !== 0) {
//     shell.echo('Error: Git create failed');
//     shell.exit(1);
// }

shell.mkdir('-p', '../../../' + repoName);

// Copy files to release dir
// shell.rm('-rf', '*.mp3');
shell.cp('../../artist.json', '../../../' + repoName);
if (shell.exec('rsync -r --exclude=.git ../../node ../../../' + repoName).code !== 0) {
    shell.echo('Error: rsync failed');
    shell.exit(1);
}
// shell.mv('../everyday', '../../../' + repoName);
shell.cd('../../../' + repoName);

shell.cd('node/everyday');

if (shell.exec('node all.js').code !== 0) {
    shell.echo('Error: node all.js failed');
    shell.exit(1);
}

// if (shell.exec('echo "' + repoName + '" >> README.md').code !== 0) {
//     shell.echo('Error: add README.md failed');
//     shell.exit(1);
// }



// if (shell.exec('git init').code !== 0) {
//     shell.echo('Error: git init failed');
//     shell.exit(1);
// }

// if (shell.exec('git add README.md').code !== 0) {
//     shell.echo('Error: git add README.md failed');
//     shell.exit(1);
// }

// if (shell.exec('git commit -m "first commit"').code !== 0) {
//     shell.echo('Error: git commit -m "first commit" failed');
//     shell.exit(1);
// }

// if (shell.exec('git remote add origin https://github.com/quiet324/' + repoName + '.git').code !== 0) {
//     shell.echo('Error: git remote add origin failed');
//     shell.exit(1);
// }

// if (shell.exec('git push -u origin master').code !== 0) {
//     shell.echo('Error: git push -u origin master failed');
//     shell.exit(1);
// }






// echo "# testcreate2" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git remote add origin https://github.com/quiet324/testcreate2.git
// git push -u origin master



// if (shell.exec('git clone https://github.com/quiet324/' + repoName + '.git').code !== 0) {
//     shell.echo('Error: git clone failed');
//     shell.exit(1);
// }

// if (shell.exec('echo "# testcreate" >> README.md').code !== 0) {
//     shell.echo('Error: git clone failed');
//     shell.exit(1);
// }

// if (shell.exec('git commit -m "Auto-commit"').code !== 0) {
//     shell.echo('Error: Git commit failed');
//     shell.exit(1);
// }

// if (shell.exec('git tag ' + artist.shortName + audio.time).code !== 0) {
//     shell.echo('Error: Git tag failed');
//     shell.exit(1);
// }

// if (shell.exec('git push').code !== 0) {
//     shell.echo('Error: Git push failed');
//     shell.exit(1);
// }

// if (shell.exec('git push --tags').code !== 0) {
//     shell.echo('Error: Git push tags failed');
//     shell.exit(1);
// }