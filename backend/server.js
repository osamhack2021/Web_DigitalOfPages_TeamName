import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3001;

const app = express();

// middleware
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.get('/api', (req, res) => {
	res.json({ message: 'Hello from Server!' });
});

if (process.env.NODE_ENV === 'production') {
	// Have Node serve the files for our built React app
	app.use(express.static(path.resolve(__dirname, '../client/build')));
	// All other GET requests not handled before will return our React app
	app.get('/*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
	});
}

app.listen(PORT, () => {
	console.log(`Server listening at https://osam-hackton--server.run.goorm.io/`);
});