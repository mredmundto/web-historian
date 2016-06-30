var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  var file = fs.readFileSync(this.paths.list, 'utf8');
  var arr = file.split('\n');
  callback(arr); 
};

exports.isUrlInList = function(url, callback) {
  var file = fs.readFileSync(this.paths.list, 'utf8');
  var arr = file.split('\n');
  callback(arr.indexOf(url) > -1);
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(this.paths.list, url + '\n', callback); 
};

exports.isUrlArchived = function(url, callback) {
  fs.exists(this.paths.archivedSites + '/' + url, callback);
};

exports.downloadUrls = function(urlArr) {
  urlArr.forEach(function(arr) {
    var fd = fs.openSync(this.paths.archivedSites + '/' + arr, 'w');
    fs.writeSync(fd, 'something');
    fs.closeSync(fd);
  }.bind(this));
};
