const express = require('express');
const { v4 } = require('uuid');
const cors = require('cors');
const axios = require('axios');

const app = express();

const corsOptions = {
	origin: 'http://localhost:3000',
};
app.use(express.json());
app.use(cors(corsOptions));

const posts = {};

app.get('/posts', (req, res) => {
	return res.status(200).json(posts);
});

app.post('/posts', async (req, res) => {
	const id = v4();
	const { title } = req.body;
	posts[id] = { id, title, comments: [] };

	await axios.post('http://localhost:8000/events', {
		type: 'PostCreated',
		data: { id, title, comments: [] },
	});

	return res.status(201).json(posts[id]);
});

app.post('/events', (req, res) => {
	const { type } = req.body;
	console.log('event received type', type);
	res.send({});
});

app.listen(4000, () => {
	console.log('server is listening on port 4000');
});
