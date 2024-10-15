// src/application/use-cases/admin/VerifyShopkeeperAccount.js

class VerifyShopkeeperAccount {
    constructor(shopkeeperRepository) {
        this.shopkeeperRepository = shopkeeperRepository;
    }

    async execute(shopkeeperId) {
        return await this.shopkeeperRepository.verifyShopkeeper(shopkeeperId);
    }
}

module.exports = VerifyShopkeeperAccount;
