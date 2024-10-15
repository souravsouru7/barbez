const OtpService = require('../../services/OtpService');
const AdminRepository = require('../../../domain/repositories/AdminRepository');
const TwilioService = require('../../services/TwilioService');
class AdminAuthUseCase {
  constructor() {
    this.otpService = OtpService;
    this.adminRepo = AdminRepository;
    this.twilioService = TwilioService;
  }

  async sendOtp(phoneNumber) {
    const otp = this.otpService.generateOtp();

    await this.twilioService.sendOtp(phoneNumber, otp);
    await this.adminRepo.saveOtp(phoneNumber, otp);

    return 'OTP sent successfully';
  }

  async verifyOtp(phoneNumber, otp) {
    const isValidOtp = await this.adminRepo.verifyOtp(phoneNumber, otp);
    if (!isValidOtp) {
      throw new Error('Invalid OTP');
    }

    
    return 'OTP verified successfully';
  }
}

module.exports = new AdminAuthUseCase();
