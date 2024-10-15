

class VerifyOtp {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async execute({ email, otp }) {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }
  
      if (user.isVerified) {
        throw new Error('User is already verified');
      }
  
      if (user.otp !== otp || user.otpExpires < Date.now()) {
        throw new Error('Invalid or expired OTP');
      }
  
      user.isVerified = true;
      user.otp = null;
      user.otpExpires = null;
  
      await this.userRepository.updateUser(user);
  
      return { message: 'OTP verified successfully. Registration complete.' };
    }
  }
  
  module.exports = VerifyOtp;
  