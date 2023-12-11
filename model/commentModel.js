import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Blog"
    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [3, " Please provide a content least 3 characters"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    
   
}, { timestamps: true })


const Comment = mongoose.model("Comment", CommentSchema)


export default Comment;


