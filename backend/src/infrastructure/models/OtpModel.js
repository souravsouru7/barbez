const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '10m' } // OTP expires in 10 minutes
});

const OtpModel = mongoose.model('Otp', otpSchema);

module.exports = OtpModel;
