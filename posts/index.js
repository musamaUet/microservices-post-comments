const express = require('express');
const { v4 } = require('uuid');

const app = express();

app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
	return res.status(200).json(posts);
});

app.post('/posts', (req, res) => {
	const id = v4();
	const { title } = req.body;
	posts[id] = { id, title };

	return res.status(201).json(posts[id]);
});

app.listen(4000, () => {
	console.log('server is listening on port 4000');
});
