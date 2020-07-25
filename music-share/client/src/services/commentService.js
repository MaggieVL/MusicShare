const COMMENTS_API_BASE = 'http://localhost:8080/api/Comments/';

class CommentService {
    async getAllComments(userId, songIdeaId) {
        const response = await fetch(`COMMENTS_API_BASE/${userId}/songIdeas/${songIdeaId}/comments`);
        return response.json();
    }

    async createComment(userId, songIdeaId, comment) {
        const response = await fetch(
            `COMMENTS_API_BASE/${userId}/songIdeas/${songIdeaId}/comments`,
            {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment)
            }
        );

        const createdComment = await response.json();
        if (response.status >= 400) {
            console.log('Error creating Comment: ', createdComment);
            throw createdComment.message;
        }
        console.log('Comment created successfully: ', createdComment);
        return createdComment;
    }

    async updateComment(userId, songIdeaId, commentId) {
        const response = await fetch(
            `${COMMENTS_API_BASE}/${userId}/songIdeas/${songIdeaId}/comments/${commentId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Comment)
            }
        );

        const updatedComment = await response.json();
        if (response.status >= 400) {
            console.log('Error updating Comment: ', updatedComment);
            throw updatedComment.message;
        }
        console.log('Comment updated successfully: ', updatedComment);
        return updatedComment;
    }

    async deleteCommentById(id) {
        const response = await fetch(
            `${COMMENTS_API_BASE}/${userId}/songIdeas/${songIdeaId}/comments/${commentId}`,
            {
                method: 'DELETE'
            }
        );

        const deletedComment = await response.json();
        if(response.status >= 400) {
            console.log('Error deleting Comment: ', deletedComment);
            throw deletedComment.message;
        }
        console.log('Comment deleted successfully: ', deletedComment);
        return deletedComment;
    }
}

const CommentService = new CommentService();
export default CommentService;