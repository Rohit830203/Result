const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortInfo: { type: String, required: true },
    postDate: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
