const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shopkeeper', required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  shopimage: { type: String },
  licenseUrl: { type: String }, 
  description: { type: String },
  services: [{
    serviceName: String,
    price: Number,
    duration: Number // in minutes
  }],
  availableSlots: [{
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, default: true }
  }],
  isWorkModeOn: { type: Boolean, default: true },
  reviews: [{  }],
  rating: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
ShopSchema.index({ address: 'text' });

module.exports = mongoose.model('Shop', ShopSchema);
