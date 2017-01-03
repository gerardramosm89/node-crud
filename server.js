//grabbing dependencies
//
const express = require('express');
	app = express(),
	port = process.env.PORT || 8080;

//set the routes
app.get('/', (req, res) => {
	res.send('Hello, I am the app!');
});

//start our server
app.listen(port, () => {
	console.log(`
		App is listening on http://localhost/${port}
	`);
});
