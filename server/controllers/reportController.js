const Report = require("../models/ReportModel")
const mongoose = require("mongoose")

const createReport = async(req, res) => {
    const { title, image, content, shortDescription, writer, category } = req.body;
    try{
        const report = await Report.create({
            title, 
            image, 
            content,
            shortDescription,
            writer,
            category,
        });
        res.status(201).json({ report });
    }
    catch (err) {
        res.status(500).json({ err });
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
    // filterReportsByCategory,
};