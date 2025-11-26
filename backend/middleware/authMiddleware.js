const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req,res,next) => {
    const token = req.header('x-auth-token');
    if (!token) 
    {
        return res.status(401).json('There is token');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded",decoded)

        req.user = await User.findById(decoded.id).select('-password');

        next();
        
    } catch (error) {
        res.status(401).json(error= "Something went wrong")
    }

}

module.exports = protect;