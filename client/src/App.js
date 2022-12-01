import React from 'react';
import CreatePost from './PostCreate';
import PostsList from './PostsList';
import './index.css';

const Blog = () => {
	return (
		<div className='container'>
			<CreatePost />
			<hr />
			<PostsList />
		</div>
	);
};
export default Blog;
