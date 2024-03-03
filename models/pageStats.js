const mongoose = require('mongoose');

const pageStatsSchema = new mongoose.Schema(
    {
        visits:{
            type: Number,
            required: [true,"cannot be empty"],
        }
    }
);

module.exports = mongoose.model("PageStats", pageStatsSchema);