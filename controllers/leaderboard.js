const Leaderboard = require('../models/leaderboard');
const User = require('../models/user');

const getLeaderboard = async (req, res) => {
    try
    {
        const leaderboard = await Leaderboard.find().sort({time: -1}).limit(req.query.limit ? parseInt(req.query.limit) : 10);
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
        const user = await User.findById(req._id);
        if(!user)
        {
            return res.status(400).send('User not found');
        }

        //if username exists in leaderboard
        if(await Leaderboard.exists({username: user.username}))
        {
            const leaderboard = await Leaderboard.findOne({username: user.username});
            if(leaderboard.time > req.body.time)
            {
                leaderboard.time = req.body.time;
                await leaderboard.save();
                res.status(200).json(leaderboard);
                return;
            }
            res.status(400).send('Better record already exists');
        }
        else
        {
            const leaderboard = new Leaderboard({
                username: user.username,
                time: req.body.time
            });
            await leaderboard.save();
            res.status(200).json(leaderboard);
        }
    }
    catch (err)
    {
        res.status(400).send(err.message);
    }
}

const deleteRecord = async (req, res) => {
    try
    {
        const user = await User.findById(req._id);
        if(!user)
        {
            return res.status(400).send('User not found');
        }
        const deleted = await Leaderboard.deleteOne({username: user.username});
        
        if(deleted.deletedCount === 0)
        {
            return res.status(400).send('Record not found');
        }
        res.status(200).send('Record deleted');
    }
    catch (err)
    {
        res.status(400).send(err.message);
    }
}

module.exports = { getLeaderboard, setRecord, deleteRecord };