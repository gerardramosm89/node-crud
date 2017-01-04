require('dotenv').config();

//grabbing dependencies

const express 				= require('express'),
			app 						= express(),
			port 						= process.env.PORT || 8080,
			expressLayouts 	= require('express-ejs-layouts'),
			mongoose 				= require('mongoose'),
	bodyParser 			= require('body-parser'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	flash = require('connect-flash'),
	expressValidator = require('express-validator');

app.use(cookieParser());
app.use(session({
	secret:process.env.SECRET,
	cookie: { maxAge: 60000 },
	resave: false, //forces the session to be saved back to the store
	saveUninitialized: false

}));
app.use(flash());
mongoose.connect('mongodb://localhost:27017/olympic-events');

//configure our application
//tell express where to look for static assets

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true}));
app.use(expressValidator());
//set the routes
app.use(require('./app/routes'));

//start our server
app.listen(port, () => {
	console.log(`
		App is listening on http://localhost/${port}
	`);
});
