const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
	return res.status(200).json(posts);
});

app.post('/events', (req, res) => {
	const { type, data } = req.body;
	if (type === 'PostCreated') {
		const { id, title } = data;
		posts[id] = { id, title, comments: [] };
	} else if (type === 'CommentCreated') {
		const { postId, id, content } = data;
		const post = posts[postId];
		post.comments.push({ id, content });
	}
});

app.listen(6000, () => {
	console.log('app is listening on port 6000');
});
