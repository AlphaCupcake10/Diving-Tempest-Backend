const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next)
{
    try
    {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req._id = decoded.id;
        next();
    }
    catch (error)
    {
        // console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = {isAuthenticated};