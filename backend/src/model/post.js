import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  banner: { type: String },
  name: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now }, // fix: proper default value
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;
