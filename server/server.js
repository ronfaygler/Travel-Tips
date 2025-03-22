const express = require('express')
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const cors = require('cors');

const reportRoutes = require("./routes/reportRoutes")

dotenv.config();

// Constants
const PORT = process.env.PORT;

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use("/api/reports", reportRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & Listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
