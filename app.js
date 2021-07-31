var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sequelize = require("./models").sequelize;

var indexRouter = require('./routes/index');
var booksRouter = require("./routes/books");
var newBookRouter = require("./routes/newbook");
var postNewBookRouter = require("./routes/postnewbook");
var updateBookRouter = require("./routes/updatebook");
var deleteBookRouter = require("./routes/deletebook");
var searchRouter = require("./routes/search");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get("/books", booksRouter);
app.get("/books/new", newBookRouter);
app.get("/books/:id", updateBookRouter);
app.post("/books/new", postNewBookRouter);
app.post("/books/:id", updateBookRouter);
app.post("/books/:id/delete", deleteBookRouter);
app.post("/search", searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render("page-not-found");
  next(createError(404, "Sorry, couldn't find the page you were looking for!"));
});

// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (!err.message) {
    err.message = "Sorry, something funky happened on our end...";
  }

  res.render('error', {err});
});

try {

  (async () => {
    await sequelize.authenticate();
    console.log('Connection to database established successfully.');

  })();

 } catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = app;
