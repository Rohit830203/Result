const mongoose = require("mongoose");

// Define the schema
const dateSchema = new mongoose.Schema({
  applicationBegin: String,
  lastDateApply: String,
  lastDatePayFee: String,
  examDate: String,
  admitCardAvailable: String,
});

// Create the model
const ImportantDate = mongoose.model("ImportantDate", dateSchema);

module.exports = ImportantDate;
