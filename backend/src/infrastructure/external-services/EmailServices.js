// backend/src/infrastructure/external-services/EmailService.js

const nodemailer = require('nodemailer');

class EmailService {
  constructor(emailUser, emailPass) {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });
  }

  async sendOtpEmail(to, otp) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'Your OTP for Registration',
      html: `<p>Your OTP for registration is: <b>${otp}</b></p>`,
    });
  }
  async sendResetOtpEmail(to, otp) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'Your OTP for Reset',
      html: `<p>Your OTP for Reset is: <b>${otp}</b></p>`,
    });
  }
}

module.exports = EmailService;
