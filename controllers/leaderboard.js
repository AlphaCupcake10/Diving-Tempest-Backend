const Leaderboard = require('../models/leaderboard');

const getLeaderboard = async (req, res) => {
    try
    {
        const leaderboard = await Leaderboard.find().sort({score: -1}).limit(10);
        res.status(200).json(leaderboard);
    }
    catch (err)
    {
        res.status(400).send(err.message);
    }
}

const setRecord = async (req, res) => {
    try
    {
        const user = await Leaderboard.findOne({_id: req._id});
        if(!user)
        {
            return res.status(400).send('User not found');
        }

        //check if the time is less than the previous time
        if(req.body.time > username.time)
        {
            return res.status(400).send('Previous time is less than the current time');
        }

        //update the time
        user.time = req.body.time;
        const updatedTime = await user.save();
        res.status(200).json(updatedTime);
    }
    catch (err)
    {
        res.status(400).send(err.message);
    }
}

const deleteRecord = async (req, res) => {
    try
    {
        const user = await Leaderboard.findByIdAndDelete(req._id);
        res.status(200).json(user);
    }
    catch (err)
    {
        res.status(400).send(err.message);
    }
}

module.exports = { getLeaderboard, setRecord, deleteRecord };