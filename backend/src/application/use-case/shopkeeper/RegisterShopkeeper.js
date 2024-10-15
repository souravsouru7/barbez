// backend/src/application/use-cases/RegisterShopkeeper.js
class RegisterShopkeeper {
  constructor(shopkeeperRepository, hashService) {
    this.shopkeeperRepository = shopkeeperRepository;
    this.hashService = hashService;
  }

  async execute({ name, email, password, contactNumber }) {
    // Check if email already exists
    const existingShopkeeper = await this.shopkeeperRepository.findByEmail(email);
    if (existingShopkeeper) {
      throw new Error('Email already in use');
    }

    // Hash the password
    const hashedPassword = await this.hashService.hash(password);

    // Create a new shopkeeper entity
    const shopkeeper = {
      name,
      email,
      password: hashedPassword,
      contactNumber,
    };

    return await this.shopkeeperRepository.createShopkeeper(shopkeeper);
  }
}

module.exports = RegisterShopkeeper;
