const express = require('express');
const router = express.Router();
const Link = require('../models/Link');

// Add a new link
router.post('/', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required." });
  }

  const newLink = new Link({ url });

  try {
    await newLink.save();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ message: "Failed to save link", error });
  }
});

// Get all links
router.get('/', async (req, res) => {
  try {
    const links = await Link.find();
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve links", error });
  }
});

// Update a link by ID
router.put('/:id', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required." });
  }

  try {
    const updatedLink = await Link.findByIdAndUpdate(req.params.id, { url }, { new: true });
    if (!updatedLink) {
      return res.status(404).json({ message: "Link not found." });
    }
    res.status(200).json(updatedLink);
  } catch (error) {
    res.status(500).json({ message: "Failed to update link", error });
  }
});

// Delete a link by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedLink = await Link.findByIdAndDelete(req.params.id);
    if (!deletedLink) {
      return res.status(404).json({ message: "Link not found." });
    }
    res.status(204).send(); // Send no content response
  } catch (error) {
    res.status(500).json({ message: "Failed to delete link", error });
  }
});

module.exports = router;
