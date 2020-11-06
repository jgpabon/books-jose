"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const path_1 = __importDefault(require("path"));
//importing routs
const routes_1 = __importDefault(require("./routes"));
const books_1 = __importDefault(require("./routes/books"));
//login
const pathl = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const { url } = require('./config/database.js');
mongoose.connect(url, {
    useMongoClient: true
});
require('./config/passport')(passport);
//instalations
const app = express_1.default();
require("./database");
//import('./database');
//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path_1.default.join(__dirname, 'views'));
app.engine('.hbs', express_handlebars_1.default({
    extname: '.hbs',
    layoutsDir: path_1.default.join(app.get('views'), 'layouts'),
    partialsDir: path_1.default.join(app.get('views'), 'partials'),
    helpers: require('./lib/helpers'),
    defaultLayout: 'main'
}));
app.set('view engine', '.hbs');
//app.set('view engine', 'ejs');
//middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
// required for passport
app.use(session({
    secret: 'faztwebtutorialexample',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//routes  
require('./app/routes.js')(app, passport);
//app.get('/books',(req, res) => res.send('books'));
app.use('/', routes_1.default);
app.use('/books', books_1.default);
// static files
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
//startin the server
app.listen(app.get('port'), () => {
    console.log('server on port ' + app.get('port'));
    //    console.log('server on port ${app.get('port')}');
});
