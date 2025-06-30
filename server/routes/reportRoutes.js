const express = require("express");
const { createReport, getAllReports, updateReport } = require("../controllers/reportController");

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
    // async (req, res) => {
    //   try {
    //     const { id } = req.params;
    //     const body = req.body;
  
    //     // Handle images
    //     const mainImage = req.files?.mainImage?.[0]?.path || body.mainImage;
    //     const images = req.files?.images?.map(file => file.path) || [];
  
    //     const updatedFields = {
    //       title: body.title,
    //       content: body.content,
    //       category: body.category,
    //       writer: body.writer,
    //       shortDescription: body.shortDescription,
    //       mainImage,
    //       images: images.length ? images : undefined,
    //     };
  
    //     const updated = await Report.findByIdAndUpdate(id, updatedFields, { new: true });
    //     console.log("Updated report from DB:", updated);
    //     res.status(200).json(updated);
    //   } catch (err) {
    //     console.error("Error updating report:", err.message);
    //     res.status(500).json({ error: "Update failed" });
    //   }
    // }
  );
module.exports = router