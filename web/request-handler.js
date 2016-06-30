var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs'); 
var http = require('http'); 

exports.handleRequest = function (req, res) {
  
  var statusCode;

  if (req.method === 'POST') {
    console.log('this is a post');
    var body = ''; 
    req.on('data', function(data) {
      body += data; 
    });
    req.on('end', function() {
      // write the url the file
      fs.appendFile(archive.paths.list, body.split('url=')[1] + '\n', function() {
        
        console.log(archive.paths.siteAssets + '/loading.html');

        fs.readFile(archive.paths.siteAssets + '/loading.html', function(error, data) {
          statusCode = '302'; 
          res.writeHead(statusCode);
          res.write(data); 
          res.end();
        });
         
      });
      //viewing the file
      //var fileContents = fs.readFileSync(archive.paths.list, 'utf8');
      //console.log(fileContents);
    });
  }

  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(__dirname + '/public/index.html', function (error, data) {
      res.end(data);
    });
  }

  if (req.method === 'GET' && req.url !== '/') { 
    fs.readFile(archive.paths.archivedSites + req.url, function (error, data) {
      if (data === undefined) {
        statusCode = 404; 
        res.writeHead(statusCode);
        res.end(); 
      } else {
        res.end(data);
      }
    });
  }



  // res.end(archive.paths.list);
};
