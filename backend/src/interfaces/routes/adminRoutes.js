// src/interfaces/routes/adminRoutes.js
const express = require('express');
const AdminController = require('../controllers/AdminController');
const MongoAdminRepository = require('../../infrastructure/db/MongoAdminRepository');


const router = express.Router();

const adminRepository = new MongoAdminRepository();


router.post('/send-otp',  AdminController.sendOtp);
router.post('/verify-otp',  AdminController.verifyOtp);
router.get('/shopkeepers', AdminController.getAllShopkeepers);
router.patch('/shopkeepers/:id/verify', AdminController.verifyShopkeeper);
router.get('/shopkeepers/:id', AdminController.getShopkeeperById);
module.exports = router;
