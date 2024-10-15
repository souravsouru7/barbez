class ManageUserFavorites {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async addToFavorites(userId, shopId) {
        return this.userRepository.addToFavorites(userId, shopId);
    }

    async removeFromFavorites(userId, shopId) {
        return this.userRepository.removeFromFavorites(userId, shopId);
    }

    async getFavorites(userId) {
        return this.userRepository.getFavoriteShops(userId);
    }
}

module.exports = ManageUserFavorites;