// interfaces/routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const CloudinaryService = require('../../infrastructure/external-services/CloudinaryService');
const UserController = require('../controllers/UserContoller');
const GetUserProfile = require('../../application/use-case/user/GetUserProfile');
const MongoUserRepository = require('../../infrastructure/db/MongoUserRepository');
const UpdateUserProfile = require('../../application/use-case/user/UpdateUserProfile');
const ManageUserFavorites = require('../../application/use-case/user/ManageUserFavorites');
// Setup dependencies
const userRepository = new MongoUserRepository();
const cloudinaryService = new CloudinaryService();

// Initialize use cases
const getUserProfileUseCase = new GetUserProfile(userRepository);
const updateUserProfileUseCase = new UpdateUserProfile(userRepository, cloudinaryService);
const manageUserFavoritesUseCase = new ManageUserFavorites(userRepository);

// Initialize controller with both use cases
const userController = new UserController(getUserProfileUseCase, updateUserProfileUseCase, manageUserFavoritesUseCase);

// Define routes
router.get('/profile/:userId', (req, res) => userController.getUserProfile(req, res));

router.put(
    '/users/:userId/profile',
    uploadMiddleware.single('profileImage'),
    (req, res) => userController.updateUserProfile(req, res)
);
router.post('/users/:userId/favorites', (req, res) => userController.addToFavorites(req, res));
router.delete('/users/:userId/favorites/:shopId', (req, res) => userController.removeFromFavorites(req, res));
router.get('/users/:userId/favorites', (req, res) => userController.getFavorites(req, res));

module.exports = router;