const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const corsOptions = {
	origin: 'http://localhost:3000',
};
app.use(express.json());
app.use(cors(corsOptions));

const posts = {};

const handleEvents = (eventType, eventData) => {
	if (eventType === 'PostCreated') {
		const { id, title } = eventData;
		posts[id] = { id, title, comments: [] };
	} else if (eventType === 'CommentCreated') {
		console.log('commentCreatedddd');
		const { postId, id, content, status } = eventData;
		const post = posts[postId];
		console.log('posts', post);
		post.comments.push({ id, content, status });
		console.log('posts after', post);
	} else if (eventType === 'CommentUpdated') {
		const { postId, id, status, content } = eventData;
		const post = posts[postId];
		const comment = post.comments.find((comment) => comment.id === id);

		comment.status = status;
		comment.content = content;
	}
};

app.get('/posts', (req, res) => {
	return res.status(200).json(posts);
});

app.post('/events', (req, res) => {
	const { type, data } = req.body;
	handleEvents(type, data);
	res.status({});
});

app.listen(6001, async () => {
	console.log('app is listening on port 6001');
	const res = await axios.get('http://localhost:8000/events');
	for (let event of res.data) {
		console.log('Processing Event: ', event.type);
		handleEvents(event.type, event.data);
	}
});
