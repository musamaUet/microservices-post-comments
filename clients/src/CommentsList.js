import React from 'react';

const CommentsList = ({ comments }) => {
	console.log('comments', comments);
	const renderedComments =
		comments &&
		comments.map((comment) => {
			let statusBasedContent;
			if (comment.status === 'pending') {
				statusBasedContent = 'This comment is awaiting moderation';
			} else if (comment.status === 'approved') {
				statusBasedContent = comment.content;
			} else if (comment.status === 'rejected') {
				statusBasedContent = 'This comment has been rejected';
			}

			return <li key={comment.id}>{statusBasedContent}</li>;
		});

	return <ul>{renderedComments}</ul>;
};

export default CommentsList;
