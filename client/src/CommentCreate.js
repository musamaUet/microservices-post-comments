import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
	const [content, setContent] = useState('');

	const submitHandler = async (event) => {
		event.preventDefault();

		const { data } = await axios.post(
			`http://posts.com/posts/${postId}/comments`,
			{ content }
		);
		setContent('');
	};

	console.log('Muhammad Usama');
	return (
		<div>
			<form onSubmit={submitHandler}>
				<div className='form-group'>
					<label>Comment</label>
					<input
						className='form-control'
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<button className='mt-2 btn btn-primary'>Submit</button>
			</form>
		</div>
	);
};

export default CommentCreate;
