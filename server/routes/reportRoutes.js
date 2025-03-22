const express = require("express");

const {
    createReport, 
    getAllReports,
} = require("../controllers/reportController");

const router = express.Router();

router.get('/', getAllReports)
router.post("/create", createReport)


module.exports = router