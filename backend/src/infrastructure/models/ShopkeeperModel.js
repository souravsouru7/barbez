// backend/src/infrastructure/db/models/ShopkeeperModel.js
const mongoose = require('mongoose');

const ShopkeeperSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    profileImage: { type: String }, // Added to store Cloudinary URL
});

module.exports = mongoose.model('Shopkeeper', ShopkeeperSchema);
