var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoDBStore = require('connect-mongo')(session);

// connect to mongodb
var dbName = 'food';
var url = 'mongodb://localhost:27017/' + dbName;
var mongoOptions = {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
};
mongoose.connect(url, mongoOptions);
mongoose.connection.on('error', function (err) {
    console.log('Mongo Error:' + err);
}).on('open', function () {
    console.log('Connection opened');
});


var login = require('./routes/login');
var index = require('./routes/index');
var userinfo = require('./routes/userinfo');
var backstage=require('./routes/backstage');
let admin=require('./routes/admin');
let regist=require('./routes/regist');


var app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var store = new MongoDBStore(
    {
        url: 'mongodb://localhost:27017/food',
        collection: 'mySessions'
    }, function (error) {
        // Should have gotten an error

    });

store.on('error', function (error) {
    // Also get an error here
});
app.use(session({
    secret: 'pmph',
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60// 1 week
    },
    resave: true,
    saveUninitialized: true

}));
app.use(function (req, res, next) {
    let extension = req.session.extension;
    let username = req.session.username;
    if (extension) {
        res.locals.extension = extension;
        res.locals.username = username;
    } else {
        console.log('sessiong过期');

    }
    next();
});

app.use('/', login);
app.use('/index', index);
app.use('/userinfo', userinfo);
app.use('/backstage',backstage);
app.use('/admin',admin);
app.use('/regist',regist);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
