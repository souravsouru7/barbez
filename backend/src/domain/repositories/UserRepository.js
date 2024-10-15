// backend/src/domain/repositories/UserRepository.js
class UserRepository {
  async createUser(user) {
      throw new Error("Method not implemented.");
  }

  async findByEmail(email) {
      throw new Error("Method not implemented.");
  }

  async verifyUser(email) {
      throw new Error("Method not implemented.");
  }

  async saveOtp(email, otp, otpExpires) {
      throw new Error("Method not implemented.");
  }

  async resetPassword(email, otp, newPassword) {
      throw new Error("Method not implemented.");
  }
  async findById(id){
    throw new Error("Method not implemented.");
  }
  async updateUserById(userId, userData){
    throw new Error("Method not implemented.");
  }
  async addToFavorites(userId, shopId){
    throw new Error("Method not implemented.");
  }
  async removeFromFavorites(userId, shopId){
    throw new Error("Method not implemented.");
  }
  async getFavoriteShops(userId){
    throw new Error("Method not implemented.");
  }
}

module.exports = UserRepository;
