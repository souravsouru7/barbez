

class GetAllShopkeepers {
    constructor(shopkeeperRepository) {
        this.shopkeeperRepository = shopkeeperRepository;
    }

    async execute() {
        return await this.shopkeeperRepository.getAllShopkeepers();
    }
}

module.exports = GetAllShopkeepers;
