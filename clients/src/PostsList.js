import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CommentCreate from './CommentCreate';
import CommentsList from './CommentsList';

const PostsList = () => {
	const [posts, setPosts] = useState({});

	useEffect(() => {
		fetchPosts();
	}, []);
	const fetchPosts = async () => {
		const { data } = await axios.get('http://posts.com/posts');
		setPosts(data);
	};

	const renderPostsList = Object.values(posts).map((post) => {
		console.log('post', post);
		return (
			<div
				className='card'
				style={{ width: '30%', marginBottom: '20px' }}
				key={post.id}
			>
				<div className='card-body'>
					<h3>{post.title}</h3>
					<CommentsList postId={post.id} comments={post?.comments} />
					<CommentCreate postId={post.id} />
				</div>
			</div>
		);
	});
	return (
		<>
			<h1>Posts List</h1>
			<div className='d-flex flex-row flex-wrap justify-content-between'>
				{renderPostsList}
			</div>
		</>
	);
};
export default PostsList;
