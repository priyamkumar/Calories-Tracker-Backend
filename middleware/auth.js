const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;
    if(!token) {
        return res.status(404).json({
            success: false,
            message: "Login First",
        });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = new ObjectId(decoded.userId);
    req.token = token;
    next();
};

module.exports = isAuthenticated;