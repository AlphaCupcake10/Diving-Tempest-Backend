const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next)
{
    try
    {
        if (!req.headers['x-token']) {
            throw new Error("Unauthorized");
        }
        const { timestamp } = decryptXToken(req.headers['x-token'] || '');
        const now = Date.now();
        const responseTime = now - timestamp;
        if (responseTime > 4000) {
            return res.status(401).json({ message: "😾" });
        }
        
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


function decryptXToken(xToken) {
    // Decode base64
    const reversedRaw = Buffer.from(xToken, 'base64').toString('utf-8');
    // Reverse string back
    const raw = reversedRaw.split('').reverse().join('');
    // Extract timestamp and random
    const [timestampStr, randomStr] = raw.split(':');
    const timestamp = Number(timestampStr);
    const random = Number(randomStr);
    return { timestamp, random };
}