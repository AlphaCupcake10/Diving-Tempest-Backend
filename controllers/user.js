const User = require('../models/user');
const Leaderboard = require('../models/leaderboard');

const getUser = async (req, res) => {
    try
    {
        const user = await User.findById(req._id);
        if (!user)
        {
            return res.status(400).send('User not found');
        }
        res.status(200).json(user);
    }
    catch (err)
    {
        res.status(400).send(err.message);
    }
}

const handleSignup = async (req, res) => {
    try
    {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        const newUser = await user.save();
        const token = newUser.generateJWT();
        res.status(201).json({token: token,...newUser._doc});
    }
    catch (err)
    {
        res.status(400).send(err.message);
    }
}

const handleSignIn = async (req, res) => {
    try
    {
        const username = req.body.username;
        const user = await User.findOne({username: username});

        if (!user)
        {
            return res.status(400).send('User not found');
        }

        if (user.comparePassword(req.body.password))
        {
            const token = user.generateJWT();
            res.status(200).json({token: token,...user._doc});
        }
        else
        {
            res.status(401).send('Invalid Password');
        }
    }
    catch (err)
    {
        res.status(400).send(err.message);
    }
}


const handleDeleteUser = async (req, res) => {
    try
    {
        const user = await User.findByIdAndDelete(req._id);
        if (!user)
        {
            return res.status(400).send('User not found');
        }
        // Also delete user from leaderboard
        const leaderboard = await Leaderboard.findOneAndDelete({username: user.username});
        
        res.status(200).json({message: 'User deleted'});

    }
    catch (err)
    {
        res.status(400).send(err.message);
    }
}


module.exports = {handleSignup , handleSignIn , handleDeleteUser , getUser};