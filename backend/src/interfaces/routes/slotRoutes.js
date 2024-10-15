// src/interfaces/routes/slotRoutes.js

const express = require('express');
const slotController = require('../controllers/slotController');

const router = express.Router();

router.get('/available', slotController.getAvailableSlots.bind(slotController));



module.exports = router;