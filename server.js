var express = require('express');
// , logger = require('morgan');

var port = process.env.PORT || 8000;
var app = express();

global.base = __dirname;

app.use("/", express.static(__dirname + "/wwwroot"));

app.listen(port, '0.0.0.0', function() {
  console.log('Listening on port %d', port);
});
