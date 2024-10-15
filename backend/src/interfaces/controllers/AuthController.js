// backend/src/interfaces/controllers/AuthController.js

const RegisterUser = require("../../application/use-case/RegisterUser")
const VerifyOtp = require('../../application/use-case/VerifyOtp');
const loginUser = require('../../application/use-case/loginUser');
const MongoUserRepository = require('../../infrastructure/db/MongoUserRepository');
const EmailService = require('../../infrastructure/external-services/EmailServices');
const ForgotPassword = require('../../application/use-case/ForgotPassword');
const ResetPassword = require('../../application/use-case/ResetPssword');
const userRepository = new MongoUserRepository();
const emailService = new EmailService(process.env.EMAIL_USER, process.env.EMAIL_PASS);

class AuthController {
  static async register(req, res) {
    const { name, email, password, phoneNumber } = req.body;
    const registerUser = new RegisterUser(userRepository, emailService);

    try {
      const response = await registerUser.execute({ name, email, password, phoneNumber });
      
      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async verifyOtp(req, res) {
    const { email, otp } = req.body;
    const verifyOtp = new VerifyOtp(userRepository);

    try {
      const response = await verifyOtp.execute({ email, otp });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const { token, user } = await loginUser(
        { email, password },
        {
          userRepository,
          config: req.app.get('config'), // Assuming you have config set in the app
        }
      );

      return res.json({ token, user });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;
    const forgotPassword = new ForgotPassword(userRepository, emailService);

    try {
        const response = await forgotPassword.execute({ email });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

  static async resetPassword(req, res) {
    const { email, otp, newPassword } = req.body;
    const resetPassword = new ResetPassword(userRepository);

    try {
      const response = await resetPassword.execute({ email, otp, newPassword });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
