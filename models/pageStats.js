const mongoose = require('mongoose');

const pageStatsSchema = new mongoose.Schema(
    {
        uniqueVisits:{
            type: Number,
            required: [true,"cannot be empty"],
        },
        dailyVisits:{
            type: Number,
            required: [true,"cannot be empty"],
        },
    }
);

module.exports = mongoose.model("PageStats", pageStatsSchema);