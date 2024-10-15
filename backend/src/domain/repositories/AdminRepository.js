const OtpModel = require('../../infrastructure/models/OtpModel');

class AdminRepository {
  async saveOtp(phoneNumber, otp) {
    await OtpModel.findOneAndUpdate(
      { phoneNumber },
      { otp },
      { upsert: true }
    );
  }

  async verifyOtp(phoneNumber, otp) {
    const otpRecord = await OtpModel.findOne({ phoneNumber, otp });
    return otpRecord !== null;
  }

 
}

module.exports = new AdminRepository();
