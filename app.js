const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


// cors only for dev
app.use(
	cors({
		origin: '*',
		allowedHeaders: [ 'sessionId', 'Content-Type','authorization','newworld' ],
		exposedHeaders: [ 'sessionId' ],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false
	})
);
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// home page
app.get('/', function(req, res) {
	console.log('You are on server 9000');
	res.send('You are live on Port: 9000');
});

// CALLING ROUTES
const books = require('./router/book');
const classes = require('./router/class');
const student = require('./router/student');


app.use(books,classes,student)

app.listen(9000, () => {
	console.log('Server Started On Port 9000');
});