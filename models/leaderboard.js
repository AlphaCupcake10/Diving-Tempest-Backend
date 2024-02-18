const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { jwtconfig } = require('../configs/server-config');

const leaderboardSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: [true,"cannot be empty"],
            unique: true,
            match: [/^[a-zA-Z0-9]+$/, "is invalid"],
        },
        time:{
            type: Number,
            required: [true,"cannot be empty"],
        }
    }
)

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

module.exports = Leaderboard;