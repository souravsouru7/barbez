// backend/src/application/use-case/shopkeeper/LoginShopkeeper.js

class LoginShopkeeper {
    constructor(shopkeeperRepository, hashService, tokenService) {
      this.shopkeeperRepository = shopkeeperRepository;
      this.hashService = hashService;
      this.tokenService = tokenService;
    }
  
    async execute({ email, password }) {
      // Find the shopkeeper by email
      const shopkeeper = await this.shopkeeperRepository.findByEmail(email);
      if (!shopkeeper) {
        throw new Error('Invalid credentials');
      }
  
      // Compare the password
      const isPasswordValid = await this.hashService.compare(password, shopkeeper.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }
  
      // Generate a token for the shopkeeper
      const token = this.tokenService.generateToken({ id: shopkeeper._id, email: shopkeeper.email });
  
      // Return the token and shopkeeper details
      return {
        token,
        shopkeeper: {
          id: shopkeeper._id,
          name: shopkeeper.name,
          email: shopkeeper.email,
          contactNumber: shopkeeper.contactNumber,
        },
      };
    }
  }
  
  module.exports = LoginShopkeeper;
  