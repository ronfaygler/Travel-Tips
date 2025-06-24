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
        const images = req.files?.images?.map(file => file.path) || [];

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

        // Handle images
        const mainImage = req.files?.mainImage?.[0]?.path || body.mainImage;
        const images = req.files?.images?.map(file => file.path) || [];

        const updatedFields = {
            title: body.title,
            content: body.content,
            category: body.category,
            writer: body.writer,
            shortDescription: body.shortDescription,
            mainImage,
            images: images.length ? images : undefined,
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
    // filterReportsByCategory,
};