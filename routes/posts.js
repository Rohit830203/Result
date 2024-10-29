const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Route for getting all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// Route for creating a new post
router.post('/', async (req, res) => {
    const { name, shortInfo, postDate } = req.body;

    const newPost = new Post({
        name,
        shortInfo,
        postDate,
    });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error saving post:', error);
        res.status(500).json({ error: 'Failed to save post' });
    }
});

// Route for updating a post
router.put('/:id', async (req, res) => {
    const { name, shortInfo, postDate } = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { name, shortInfo, postDate },
            { new: true }
        );
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update post' });
    }
});

// Route for deleting a post
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

module.exports = router;
