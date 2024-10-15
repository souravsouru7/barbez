const crypto = require('crypto'); // Add this for OTP generation
const User = require('../../domain/entities/User');
class RegisterUser {
  constructor(userRepository, emailService) {
    this.userRepository = userRepository;
    this.emailService = emailService;
  }

  async execute({ name, email, password, phoneNumber }) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    const user = new User({
      name, 
      email, 
      password, 
      phoneNumber, 
      otp, 
      otpExpires
    });

    await this.userRepository.createUser(user);
    await this.emailService.sendOtpEmail(email, otp); // Send the OTP via email

    return { message: 'User registered. Please verify your OTP.' };
  }
}

module.exports = RegisterUser;
