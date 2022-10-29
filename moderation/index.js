const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', async (req, res) => {
	const { type, data } = req.body;
	if (type === 'CommentCreated') {
		const status = data.content.includes('orange') ? 'rejected' : 'approved';
		await axios.post('http://localhost:8000/events', {
			type: 'CommentModerated',
			data: {
				...data,
				status,
			},
		});
	}
	res.send({});
});

app.listen(7000, () => {
	console.log('App is listening on port 7000');
});
