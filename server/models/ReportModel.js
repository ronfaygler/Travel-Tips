const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Optional: trims whitespace around the title
  },
  image: {
    type: String, // You can store the image URL or path if you're not storing it as binary data
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["חדשות","מלונות", "נקודות", "כרטיסי אשראי"],
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create and export the model
const ReportModel = mongoose.model('Report', reportSchema);

module.exports = ReportModel;
