import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String, 
  },
  revisions: [
    {
      title: String,
      content: String,
      image: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;








