const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  mainImage: {
    type: String,
    required: false,
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
  images: {
    type: [
      {
        name: {
          type: String,
          required: true
        }
      }
    ],
    required: false
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create and export the model
const ReportModel = mongoose.model('Report', reportSchema);

module.exports = ReportModel;
