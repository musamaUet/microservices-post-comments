const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', (req, res) => {
	const event = req.body;
	try {
		axios.post('http://localhost:4000/events', event);
		axios.post('http://localhost:5000/events', event);
		axios.post('http://localhost:6001/events', event);
		axios.post('http://localhost:7000/events', event);
		res.send({ status: 'OK' });
	} catch (err) {
		console.log('event server err', err);
		res.send({ status: 'FAILED' });
	}
});

app.listen(8000, () => {
	console.log('eventBus is listening on port ', 8000);
});