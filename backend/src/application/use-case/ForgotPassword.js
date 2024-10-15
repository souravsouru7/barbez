// backend/src/application/use-case/ForgotPassword.js
class ForgotPassword {
    constructor(userRepository, emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    async execute({ email }) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 15 * 60 * 1000); 

        await this.userRepository.saveOtp(email, otp, otpExpires);
        await this.emailService.sendResetOtpEmail(user.email, otp);

        return { message: "OTP sent to email" };
    }
}

module.exports = ForgotPassword;
