var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var log4js = require('log4js');

log4js.configure({
    appenders: [
        {type: 'console'},//控制台输出
        {
            type: 'file',//文件输出
            filename: 'logs/access.log',
            maxLogSize: 1024,
            backups: 3,
            category: 'normal'
        }
    ],
    replaceConsole: true
});

var routes = require('./routes/index');
var users = require('./routes/users');
var md5 = require('./routes/md5');
var spider = require('./routes/spider');
var orm2 = require('./routes/orm2');
var one = require('./routes/one');
var guokr = require('./routes/guokr');

var db = require('./models/db');

var app = express();

exports.logger = function (name) {
    var logger = log4js.getLogger('normal');
    logger.setLevel('ERROR');
    return logger;
};
app.use(log4js.connectLogger(this.logger('normal'), {level: 'auto', format: ':method:url'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: true
}));

app.use('/', routes);
app.use('/users', users);
app.use('/md5', md5);
app.use('/spider', spider);
app.use('/orm2', orm2);
app.use('/one', one);
app.use('/guokr', guokr);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



var task = require('./common/task');
var later = require('later');
later.date.localTime();
var basic = {h: [1], m: [15]};
var composite = [basic, {h: [14], m: [15]}];
var schedule = {
    schedules: composite
};
//var sched = later.parse.recur().on(schedule);
var t = later.setInterval(task, schedule);

var guokrTask = require('./common/guokrTask');
var composite2 = [{h: [2], m: [0]},{h:[14],m:[0]}];
var schedule2 = {
    schedules: composite2
};

//var sched1 = later.parse.recur().on(schedule2),
var ta = later.setInterval(function () {
    guokrTask();
}, schedule2);


module.exports = app;


