require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,{
  writeConcern: { w: 'majority' },
});
const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Connected to Database'));


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

const userRouter = require('./routes/user'); 
app.use('/user', userRouter);

const leaderboardRouter = require('./routes/leaderboard');
app.use('/leaderboard', leaderboardRouter);


app.listen(process.env.PORT, () => {
  console.log('Server Started');
});