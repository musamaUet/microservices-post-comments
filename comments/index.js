const express = require('express');
const { v4 } = require('uuid');
const cors = require('cors');

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

app.post('/posts/:postId/comments', (req, res) => {
	const { postId } = req.params;
	const { content } = req.body;

	const comments = commentsByPostId[postId] || [];
	comments.push({ id: v4(), content });
	commentsByPostId[postId] = comments;
	return res.status(200).json({ comments: commentsByPostId[postId] });
});

app.listen(5000, () => {
	console.log('comments service is listening on port 5000');
});
