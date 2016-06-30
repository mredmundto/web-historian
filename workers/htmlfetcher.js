// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var request = require('request');
var archive = require('../helpers/archive-helpers');

var fetch = function(){
  console.log('this is fetch!!!')

  archive.readListOfUrls(function(arr){
    archive.downloadUrls(arr);
  });
};
fetch()