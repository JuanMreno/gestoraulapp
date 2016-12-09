var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auth = require('http-auth');

var basic = auth.basic({
  realm: "Simon Area.",
  file: __dirname + "/auth/app_auth.htpasswd" // gevorg:gpass, Sarah:testpass ...
});

process.env.REPORTS_DIR = "./public/reports";
process.env.ABS_REPORTS_DIR = __dirname + "/public/reports";
process.env.LICENSE_SERVER = 'http://ielicenseserver.herokuapp.com/validacion/verificacion_licencia';
process.env.BUNDLE_ID = 'cloudlabs.server.classroomversion';

var app = express();

var rLogin = require('./routes/login');
var rGroups = require('./routes/groups');
var rMess = require('./routes/messages');
var rRank = require('./routes/ranking');
var rSubj = require('./routes/subjects');
var rStud = require('./routes/students');
var rEval = require('./routes/evaluation');
var rLabs = require('./routes/laboratories');
var rUpLs = require('./routes/uploads');
var rRepo = require('./routes/reports');
var rExts = require('./routes/externals');
var rUsrs = require('./routes/users');
var rApp = require('./routes/app');
var rLic = require('./routes/license');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/login', rLogin);
app.use('/groups', rGroups);
app.use('/messages', rMess);
app.use('/ranking', rRank);
app.use('/subjects', rSubj);
app.use('/students', rStud);
app.use('/evaluation', rEval);
app.use('/laboratories', rLabs);
app.use('/uploads', rUpLs);
app.use('/reports', rRepo);
app.use('/externals', rExts);
app.use('/users', rUsrs);
app.use('/app', rApp);
app.use('/license', rLic);
//app.use(auth.connect(basic));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

