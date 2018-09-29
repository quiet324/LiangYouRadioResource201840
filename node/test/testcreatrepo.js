     var shell = require('shelljs');

     var repoName = "testcreate12";

     var createReops = "curl -u 'quiet324:538caadb32064c69aaa3a494c7e4719ab8bc78e8' https://api.github.com/user/repos -d '{\"name\":\"\'" + repoName + "\'\"}' ";

     if (shell.exec(createReops).code !== 0) {
         shell.echo('Error: Git create failed');
         shell.exit(1);
     }