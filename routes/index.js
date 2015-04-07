var express = require('express');
var router = express.Router();
var fs = require('fs');
var Problem = require('../models/problem.js');

var process = require('child_process');

var problemsDir = __dirname + '/../problems';

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readdir(problemsDir, function listProblems(err, files) {
    console.log(files);
    // Get random file
    var index = Math.random() * (files.length);
    index = Math.floor(index);
    console.log('Problem ' + index);
    console.log(files[index]);
    var filename = files[index];

    // READ FILE
    fs.readFile(problemsDir + '/' + filename, { encoding: 'utf8' },
        function readFileProblem(err, data) {
          if (err) { throw err }
          console.log(data);
          // CREATE PROBLEM
          var p = new Problem(filename, data);
          console.log(p);
          res.render('index', { title: 'Express', problem: p });
    })
  });
});

router.post('/code', function(req, res, next) {
  console.log('CODE RECEIVED');
  var code = req.body['user_code'];
  console.log( code );
  // res.send('PROCESSED');

  fs.writeFile('temp.py', code, function(err) {
    if (err) {
      res.end('ERROR!');
      throw err;
    }
    var output = '';
    var python = process.spawn(
      'python', [ 'temp.py' ]
    );
    python.stdout.on('data', function(data) {
      console.log('stdout: ' + data);
      output += data;
    });

    python.stderr.on('data', function(data) {
      console.log('stderr: ' + data);
      output += data;
    });

    python.on('close', function(code) {
      console.log('child process exited with code ' + code);
      res.send(output);
    });
  });
});

module.exports = router;
