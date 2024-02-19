require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Connected to Database'));


app.use(express.json());

const userRouter = require('./routes/user'); 
app.use('/user', userRouter);

const leaderboardRouter = require('./routes/leaderboard');
app.use('/leaderboard', leaderboardRouter);


app.listen(process.env.PORT, () => {
  console.log('Server Started');
});