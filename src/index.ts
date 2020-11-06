import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import mongoose from 'mongoose';
import passport  from 'passport';
import flash from 'connect-flash';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';


//importing routs
import indexRoutes from './routes';
import booksrouts from './routes/books';

//login
//import { url } from './config/database.js';
//import url from './database';


//instalations
const app = express();
import './database'  ;

//import('./database');

//settings
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
extname:'.hbs',
layoutsDir: path.join(app.get('views'),'layouts'),
partialsDir: path.join(app.get('views'),'partials'),
helpers: require('./lib/helpers'),
defaultLayout: 'main'
})  );
app.set('view engine', '.hbs'); 
//app.set('view engine', 'ejs');
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));  
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

// required for passport
app.use(session({
	secret: 'pruebajose',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//routes  
require('./app/routes.js')(app, passport);
//app.get('/books',(req, res) => res.send('books'));
app.use('/', indexRoutes)
app.use('/books', booksrouts);
// static files
app.use(express.static(path.join(__dirname, 'public')));

//startin the server
app.listen(app.get('port'), ()  =>{
console.log('server on port '+ app.get('port'));
//    console.log('server on port ${app.get('port')}');
});