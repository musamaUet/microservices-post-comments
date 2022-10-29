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

const commentsByPostId = [];

app.get('/posts/:postId/comments', (req, res) => {
	const { postId } = req.params;
	const comments = commentsByPostId[postId] || [];
	return res.status(200).json(comments);
});

app.post('/posts/:postId/comments', async (req, res) => {
	const { postId } = req.params;
	const { content } = req.body;

	const comments = commentsByPostId[postId] || [];
	const commentId = v4();
	comments.push({ id: commentId, content, status: 'pending' });
	commentsByPostId[postId] = comments;

	await axios.post('http://localhost:8000/events', {
		type: 'CommentCreated',
		data: { id: commentId, content, postId, status: 'pending' },
	});

	return res.status(200).json({ comments: commentsByPostId[postId] });
});

app.post('/events', async (req, res) => {
	const { type, data } = req.body;
	if (type === 'CommentModerated') {
		const { postId, id, status } = data;
		const comments = commentsByPostId[postId];
		const comment = comments.find((comment) => comment.id === id);
		comment.status = status;
		try {
			await axios.post('http://localhost:6001/events', {
				type: 'CommentUpdated',
				data,
			});
		} catch (err) {
			console.log('comment service err', err);
		}
	}
	res.send({});
});

app.listen(5000, () => {
	console.log('comments service is listening on port 5000');
});
