import Comment from '../model/commentModel.js';
import Blog from '../model/blogModel.js';

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { blogId, content } = req.body;
    const userId = req.user._id; 

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const comment = new Comment({
      blog: blogId,
      content,
      user: userId,
    });

    await comment.save();

    return res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get comments for a specific blog post
const getCommentsByBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    const comments = await Comment.find({ blog: blogId }).populate('user');

    if (!comments) {
      return res.status(404).json({ message: 'Comments not found' });
    }

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



export { createComment, getCommentsByBlog };
