const express = require('express');
const Vacancy = require('../models/Vacancy');
const router = express.Router();

// POST route to add a new vacancy
router.post('/', async (req, res) => {
  const { postName, totalPost, eligibility } = req.body;

  try {
    const newVacancy = new Vacancy({ postName, totalPost, eligibility });
    await newVacancy.save();
    res.status(201).json(newVacancy);
  } catch (error) {
    console.error("Error saving vacancy:", error);
    res.status(500).json({ message: "Failed to save vacancy" });
  }
});

// GET route to fetch all vacancies
router.get('/', async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    res.json(vacancies);
  } catch (error) {
    console.error("Error fetching vacancies:", error);
    res.status(500).json({ message: "Failed to fetch vacancies" });
  }
});

// PUT route to update an existing vacancy
router.put('/:id', async (req, res) => {
  const { postName, totalPost, eligibility } = req.body;

  try {
    const updatedVacancy = await Vacancy.findByIdAndUpdate(
      req.params.id,
      { postName, totalPost, eligibility },
      { new: true } // Return the updated document
    );

    if (!updatedVacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }

    res.json(updatedVacancy);
  } catch (error) {
    console.error("Error updating vacancy:", error);
    res.status(500).json({ message: "Failed to update vacancy" });
  }
});

// DELETE route to delete a vacancy
router.delete('/:id', async (req, res) => {
  try {
    const deletedVacancy = await Vacancy.findByIdAndDelete(req.params.id);

    if (!deletedVacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }

    res.json({ message: "Vacancy deleted successfully" });
  } catch (error) {
    console.error("Error deleting vacancy:", error);
    res.status(500).json({ message: "Failed to delete vacancy" });
  }
});

// Export the router
module.exports = router;
