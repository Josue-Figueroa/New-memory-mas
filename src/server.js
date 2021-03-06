const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//Inicializaciones
const app = express();
require('./config/passport');
app.use(flash());

//Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

//Middlewaress
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Variables Globales
//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));

//Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
