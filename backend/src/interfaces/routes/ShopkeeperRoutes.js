// backend/src/interfaces/routes/ShopkeeperRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Store uploaded images temporarily

// Inject dependencies
const ShopkeeperRepositoryMongo = require('../../infrastructure/db/ShopkeeperRepositoryMongo');
const RegisterShopkeeper = require('../../application/use-case/shopkeeper/RegisterShopkeeper');
const LoginShopkeeper = require('../../application/use-case/shopkeeper/LoginShopkeeperUseCase');
const GetShopkeeperById = require('../../application/use-case/shopkeeper/GetShopkeeperById');
const UpdateShopkeeper = require('../../application/use-case/shopkeeper/UpdateShopkeeperUseCase');
const HashService = require('../../application/services/HashService');
const TokenService = require('../../application/services/TokenService');
const CloudinaryService = require('../../infrastructure/external-services/CloudinaryService');
const ShopkeeperController = require('../controllers/ShopkeeperController');

// Initialize services and use cases
const shopkeeperRepository = new ShopkeeperRepositoryMongo();
const hashService = new HashService();
const tokenService = new TokenService();
const cloudinaryService = new CloudinaryService();

// Use cases
const registerShopkeeperUseCase = new RegisterShopkeeper(shopkeeperRepository, hashService);
const loginShopkeeperUseCase = new LoginShopkeeper(shopkeeperRepository, hashService, tokenService);
const getShopkeeperByIdUseCase = new GetShopkeeperById(shopkeeperRepository);
const updateShopkeeperUseCase = new UpdateShopkeeper(shopkeeperRepository, cloudinaryService);


const shopkeeperController = new ShopkeeperController(
  registerShopkeeperUseCase,
  loginShopkeeperUseCase,
  getShopkeeperByIdUseCase,
  updateShopkeeperUseCase
);

// Routes
router.post('/register', (req, res) => shopkeeperController.register(req, res));
router.post('/login', (req, res) => shopkeeperController.login(req, res));
router.get('/:id', (req, res) => shopkeeperController.getShopkeeperById(req, res));
router.put('/:id', upload.single('profileImage'), (req, res) => shopkeeperController.updateShopkeeper(req, res));

module.exports = router;
