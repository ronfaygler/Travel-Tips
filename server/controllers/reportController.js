const Report = require("../models/ReportModel")
const mongoose = require("mongoose")
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const createReport = async (req, res) => {
    try {        
        // Handle file uploads
        const mainImage = req.files?.mainImage?.[0] ? req.files.mainImage[0].path : null;
        // const images = req.files?.images?.map(file => file.path) || [];
        const images = req.files?.images?.map(file => ({
            name: file.path
        }));
        // const images = req.files?.images || [];
        console.log("images in controller: ", images);
        // Validate required fields
        if (!req.body.title || !req.body.content || !req.body.shortDescription || !req.body.writer || !req.body.category) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const report = await Report.create({
            title: req.body.title,
            mainImage: mainImage,
            content: req.body.content,
            shortDescription: req.body.shortDescription,
            writer: req.body.writer,
            category: req.body.category,
            images: images
        });
        res.status(201).json({ report });
    } catch (err) {
        console.error('Error creating report:', err);
        res.status(500).json({ error: 'Failed to create report', details: err.message });
    }
}

const updateReport = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        // Handle main image
        const mainImage = req.files?.mainImage?.[0]?.path || body.mainImage;

        // Get existing image names from the request
        const existingImageNames = Array.isArray(body.existingImageNames) 
            ? body.existingImageNames
            : body.existingImageNames 
                ? [body.existingImageNames]
                : [];

        // Handle new uploaded images
        const newImagePaths = req.files?.images?.map(file => file.path) || [];

        // Get existing report to preserve image IDs
        const existingReport = await Report.findById(id);
        if (!existingReport) {
            return res.status(404).json({ error: 'Report not found' });
        }

        // Create existing images array with both name and _id
        const existingImages = existingImageNames.map(name => {
            const existingImage = existingReport.images.find(img => img.name === name);
            return existingImage ? {
                name: existingImage.name,
                _id: existingImage._id
            } : { name };
        });

        // Create new images array
        const newImages = newImagePaths.map(path => ({
            name: path
        }));

        // Combine existing and new images
        const allImages = [...existingImages, ...newImages];

        const updatedFields = {
            title: body.title,
            content: body.content,
            category: body.category,
            writer: body.writer,
            shortDescription: body.shortDescription,
            mainImage,
            images: allImages
        };

        const updatedReport = await Report.findByIdAndUpdate(id, updatedFields, { new: true });
        if (!updatedReport) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.status(200).json(updatedReport);
    } catch (err) {
        console.error('Error updating report:', err);
        res.status(500).json({ error: 'Failed to update report', details: err.message });
    }
}

const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    }
    catch (err) {
        res.status(500).json({ error: 'Unable to fetch reports' });
    }
}

const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;        
        await Report.findByIdAndDelete(id);
        console.log("Report deleted successfully");
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (err) {
        console.error('Error deleting report:', err);
        res.status(500).json({ error: 'Failed to delete report', details: err.message });
    }
}

// const filterReportsByCategory = async (req, res) => {
//     try {
//         const category = req.params.category;
//         const reportsFiltered = await Report.find({ category });

//         if (!reportsFiltered || reportsFiltered.length == 0) {
//             return res.status(404).json({ mssg: "לא נמצאו כתבות בנושא זה"});
//         }
//         return res.status(200).json(reportsFiltered);
//     } catch(err) {
//         console.error('Error fetching reports by category: ', err);
//         return res.status(500).json({ mssg: "שגיאת שרת בהשגת כתבות", error: err.message });
//     }
// };

module.exports = {
    createReport,
    getAllReports,
    updateReport,
    deleteReport,
    // filterReportsByCategory,
};