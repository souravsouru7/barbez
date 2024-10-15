// backend/src/domain/entities/User.js

class User {
  constructor({ name, email, password, phoneNumber, isVerified = false, otp = null, otpExpires = null }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.isVerified = isVerified;
    this.otp = otp;
    this.otpExpires = otpExpires;
  }
}

module.exports = User;
