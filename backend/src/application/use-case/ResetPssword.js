// backend/src/application/use-case/ResetPassword.js

const bcrypt = require('bcrypt');

class ResetPassword {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, otp, newPassword }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }


    if (user.otp !== otp || user.otpExpires < Date.now()) {
      throw new Error("Invalid or expired OTP");
    }

   
    user.password = await bcrypt.hash(newPassword, 10);

   
    user.otp = null;
    user.otpExpires = null;

    
    await this.userRepository.updateUser(user);

    return { message: "Password reset successfully" };
  }
}

module.exports = ResetPassword;
