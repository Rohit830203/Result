const express = require('express');
const router = express.Router();
const ImportantDate = require('../models/importantDateModel');

// Function to format the date to dd-mm-yyyy
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year = String(d.getUTCFullYear());
  return `${day}-${month}-${year}`;
};

// Route to fetch all important dates
router.get('/', async (req, res) => {
  try {
    const dates = await ImportantDate.find();
    res.json(dates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dates." });
  }
});

// Route to submit new important dates
router.post('/submitDates', async (req, res) => {
  const { applicationBegin, lastDateApply, lastDatePayFee, examDate, admitCardAvailable } = req.body;
  const importantDate = new ImportantDate({
    applicationBegin,
    lastDateApply,
    lastDatePayFee,
    examDate,
    admitCardAvailable
  });

  try {
    await importantDate.save();
    res.status(201).json({ message: "Important date created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error creating important date." });
  }
});

// Route to update an existing important date
router.put('/updateDate/:id', async (req, res) => {
  const { applicationBegin, lastDateApply, lastDatePayFee, examDate, admitCardAvailable } = req.body;

  try {
    const updatedDate = await ImportantDate.findByIdAndUpdate(req.params.id, {
      applicationBegin,
      lastDateApply,
      lastDatePayFee,
      examDate,
      admitCardAvailable
    }, { new: true });

    if (!updatedDate) {
      return res.status(404).json({ message: "Date not found." });
    }
    res.json({ message: "Date updated successfully.", updatedDate });
  } catch (error) {
    res.status(500).json({ message: "Error updating date." });
  }
});

// Route to delete an important date
router.delete('/deleteDate/:id', async (req, res) => {
  console.log("Received ID for deletion:", req.params.id); // Log the ID for debugging
  try {
    const deletedDate = await ImportantDate.findByIdAndDelete(req.params.id);
    if (!deletedDate) {
      return res.status(404).json({ message: "Date not found." });
    }
    res.json({ message: "Date deleted successfully." });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error deleting date." });
  }
});

module.exports = router;
