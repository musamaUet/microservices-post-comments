const express = require('express');
const cors = require('cors');

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

app.post('/events', (req, res) => {
	const { type, data } = req.body;
	if (type === 'PostCreated') {
		const { id, title } = data;
		posts[id] = { id, title, comments: [] };
	} else if (type === 'CommentCreated') {
		console.log('commentCreatedddd');
		const { postId, id, content, status } = data;
		const post = posts[postId];
		console.log('posts', post);
		post.comments.push({ id, content, status });
		console.log('posts after', post);
	} else if (type === 'CommentUpdated') {
		const { postId, id, status, content } = data;
		const post = posts[postId];
		const comment = post.comments.find((comment) => comment.id === id);

		comment.status = status;
		comment.content = content;
	}
	res.status({});
});

app.listen(6001, () => {
	console.log('app is listening on port 6001');
});
