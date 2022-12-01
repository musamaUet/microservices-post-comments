import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
	const [title, setTitle] = useState('');

	const onSubmithandler = async (event) => {
		event.preventDefault();

		const { data } = await axios.post('http://posts.com/posts', { title });
		setTitle('');
	};
	return (
		<div>
			<h1>Create Post</h1>
			<form onSubmit={onSubmithandler} className='mx-5'>
				<div className='form-group'>
					<label>Title</label>
					<input
						className='form-control mt-3'
						value={title}
						name='title'
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<button className='btn btn-primary mt-3'>Submit Post</button>
			</form>
		</div>
	);
};

export default CreatePost;
