const jwt = require('jsonwebtoken');
const { jwtconfig } = require('../configs/server-config');

const isAuthenticated = async (req, res, next) => {
    try
    {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, jwtconfig.secret);
        if(!decoded)
        {
            return res.status(401).message("Unauthorized");
        }
        req.user = decoded.id;
        next();
    } catch (err) {
        return res.status(401).message("Unauthorized");
    }
}
module.exports = {
    isAuthenticated,
};
  