const User = require('../models/user');

const getUser = async (req, res) => {
    try
    {
        const user = await User.findById(req._id);
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
        const user = await User.findByIdAndDelete(req.user._id);
        res.status(200).json(user);
    }
    catch (err)
    {
        res.status(400).send(err.message);
    }
}


module.exports = {handleSignup , handleSignIn , handleDeleteUser , getUser};