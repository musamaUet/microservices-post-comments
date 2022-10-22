const express = require('express');
const { v4 } = require('uuid');

const app = express();

app.use(express.json());

const commentsByPostId = {};

app.get('post/:postId/comments', (req, res) => {
	const { postId } = req.params;
	return res.status(200).json({ comments: commentsByPostId[postId] });
});

app.post('post/:postId/comments', (req, res) => {
	const { postId } = req.params;
	const { content } = req.body;

	const comments = commentsByPostId[postId] || [];
	comments.push({ id: v4(), content });

	return res.status(200).json({ comments: commentsByPostId[postId] });
});

app.listen(5000, () => {
	console.log('comments service is listening on port 5000');
});
