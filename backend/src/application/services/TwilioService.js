const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, ADMIN_PHONE_NUMBER } = process.env;

class TwilioService {
  constructor() {
    this.client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  }

  async sendOtp(phoneNumber, otp) {
    if (phoneNumber !== ADMIN_PHONE_NUMBER) {
      throw new Error('Unauthorized phone number');
    }

    return await this.client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
  }
}

module.exports = new TwilioService();
