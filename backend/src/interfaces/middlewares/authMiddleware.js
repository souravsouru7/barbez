const jwt = require('jsonwebtoken');
const MongoUserRepository = require('../../infrastructure/db/MongoUserRepository');

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'No token provided'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from database
        const userRepository = new MongoUserRepository();
        const user = await userRepository.findById(decoded.id);

        if (!user) {
            throw new Error();
        }

        // Attach user to request object
        req.user = {
            id: user._id,
            email: user.email
        };

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            error: 'Please authenticate'
        });
    }
};

module.exports = authMiddleware;