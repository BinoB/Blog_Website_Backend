import mongoose from "mongoose";
import Blog from "../model/blogModel.js";
import User from "../model/userModel.js";

export const getAllBlogs = async (req, res, next) => {
  let blogs;

  try {
    blogs = await Blog.find().populate("user");
  } catch (error) {
    console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blog Found!" });
  }
  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, content, image, user,category } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to Find user by this Id" });
  }

  const blog = new Blog({
    title,
    content,
    image,
    user,
    category,
    revisions: [{ title, content, image }],
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, content, image,category } = req.body;
  const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Save the current version to the revision
    blog.revisions.push({
      title: blog.title,
      content: blog.content,
      image: blog.image,
    });

    // Update the blog with the new content
    blog.title = title;
    blog.content = content;
    blog.image = image;
    blog.category = category;

    await blog.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to update Blog" });
  }

  return res.status(200).json({ blog });
};
export const getBlogById = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "No blog found!" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  let blog;
  try {
    blog = await Blog.findByIdAndDelete(req.params.id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};

export const getUserById = async (req, res, next) => {
  let userBlogs;
  try {
    userBlogs = await User.findById(req.params.id).populate("blogs");
  } catch (error) {
    console.log(error);
  }
  if (!userBlogs) {
    return res.status(400).json({ message: "No blogs found!" });
  }
  return res.status(200).json({ user : userBlogs });
};