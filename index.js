// Dependencies
var url  = require('url');
var path = require('path');
var send = require('send');
var mime = require('mime');
var options = module.parent.options;

exports.global = function($){
  var root = options.root || '/static';
  var pathname = $.url.pathname;
  var mimeType = mime.lookup(pathname);
  var extension = path.extname(pathname);
  // if no route was specified there is an extension and mimeType is not binary
  if($.noRoute && extension && mimeType != 'application/octet-stream'){
    // set header
    $.header('content-type', mimeType);
    $.status(200);
    
    // send static file
    send($.request, $.url.pathname, { root: root })
      .on('error', function(err) {
        //console.log(err);
        $.status(err.status || 500, 'File not found.');
        $.return();
      }).pipe($.response); 
  } else {
    $.return();
  }
}

module.parent.return();