// export NG_ENVIRONMENT=Dev
// export LANDMARK=http://informationcart.eastus2.cloudapp.azure.com:80/api/
// export MAPSAPI=http://informationcart.eastus2.cloudapp.azure.com:82/api/

const APIENDPOINT = process.env.APIENDPOINT || '';
const LANDMARK = process.env.LANDMARK || '';
const MAPSAPI = process.env.MAPSAPI || '';
const NG_ENVIRONMENT = process.env.NG_ENVIRONMENT || '';
/*OAuth*/
const AUTHORITY = process.env.AUTHORITY || '';
const CLIENT_ID = process.env.CLIENT_ID || '';
const REDIRECT_URI = process.env.REDIRECT_URI || '';
const RESPONSE_TYPE = process.env.RESPONSE_TYPE || '';
const SCOPE = process.env.SCOPE || '';
const POST_LOGOUT_REDIRECT_URI = process.env.POST_LOGOUT_REDIRECT_URI || '';

var path = require('path');
var express = require('express');
var port = process.env.PORT || 8000;
var app = express();
global.base = __dirname;

// view engine setup
app.set('views', path.join(__dirname, 'wwwroot'));
app.set('view engine', 'pug');

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', {
    APIENDPOINT: APIENDPOINT,
    LANDMARK: LANDMARK,
    MAPSAPI: MAPSAPI,
    ng2ENV: NG_ENVIRONMENT,
/*OAuth*/
    authority: AUTHORITY,
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: RESPONSE_TYPE,
    scope: SCOPE,
    post_logout_redirect_uri: POST_LOGOUT_REDIRECT_URI
  });
});

app.use(express.static(path.join(__dirname, 'wwwroot')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log("================================Error================================");
  console.log("message: " + err.message);
  console.log("status: " + err.status);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, '0.0.0.0', function() {
  console.log('Listening on port %d', port);
});
