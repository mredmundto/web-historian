var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs'); 
var http = require('http'); 

exports.handleRequest = function (req, res) {
  
  var statusCode; 
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
