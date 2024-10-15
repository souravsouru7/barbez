// src/application/use-case/shopkeeper/GetShopkeeperById.js
class GetShopkeeperById {
    constructor(shopkeeperRepository) {
        this.shopkeeperRepository = shopkeeperRepository;
    }

    async execute(id) {
        return await this.shopkeeperRepository.findById(id);
    }
}

module.exports = GetShopkeeperById;
