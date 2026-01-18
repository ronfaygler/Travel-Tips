const express = require("express");
const { createReport, getAllReports, updateReport, addCommentToReport, deleteReport, getReportById } = require("../controllers/reportController");

const router = express.Router();

// Use multer middleware for file uploads
const multer = require('multer');
const path = require('path');

// Configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Configure multer
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fields: [
        {
            name: 'mainImage',
            maxCount: 1
        },
        {
            name: 'images',
            maxCount: 10
        }
    ]
});

// Get all reports
router.get('/', getAllReports);

// Create report with file upload support
router.post(
    "/create",
    upload.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'images', maxCount: 10 }
    ]),
    createReport
);

router.put(
    '/update-report/:id',
    upload.fields([
      { name: 'mainImage', maxCount: 1 },
      { name: 'images', maxCount: 10 },
    ]),
    updateReport
  );

router.put('/add-comment-to-report/:id', addCommentToReport);

router.delete('/delete-report/:id', deleteReport);

// Get single report by ID (must be last to not catch other routes)
router.get('/:id', getReportById);

module.exports = router;