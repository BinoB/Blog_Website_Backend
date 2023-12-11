import express from 'express';
import { createComment, getCommentsByBlog } from '../controllers/commentController.js';

const router = express.Router();

router.post('/comments', createComment);

router.get('/blogs/:blogId/comments', getCommentsByBlog);


export default router;
