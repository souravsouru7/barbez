class UserController {
    constructor(getUserProfileUseCase,updateUserProfileUseCase,  manageUserFavoritesUseCase) {
        this.getUserProfileUseCase = getUserProfileUseCase;
        this.updateUserProfileUseCase = updateUserProfileUseCase;;
        this.manageUserFavoritesUseCase = manageUserFavoritesUseCase;
    }

    async getUserProfile(req, res) {
        try {
            const userId = req.params.userId;
            const user = await this.getUserProfileUseCase.execute(userId);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
    async updateUserProfile(req, res) {
        try {
            const userId = req.params.userId;
            const userData = req.body;
            const imageFile = req.file;

            const updatedUser = await this.updateUserProfileUseCase.execute(userId, userData, imageFile);

            res.status(200).json({
                success: true,
                data: updatedUser
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async addToFavorites(req, res) {
        try {
            const { userId } = req.params;
            const { shopId } = req.body;
            
            const updatedUser = await this.manageUserFavoritesUseCase.addToFavorites(userId, shopId);
            res.status(200).json({
                success: true,
                message: 'Shop added to favorites',
                favoriteShops: updatedUser.favoriteShops
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async removeFromFavorites(req, res) {
        try {
            const { userId, shopId } = req.params;
            
            const updatedUser = await this.manageUserFavoritesUseCase.removeFromFavorites(userId, shopId);
            res.status(200).json({
                success: true,
                message: 'Shop removed from favorites',
                favoriteShops: updatedUser.favoriteShops
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getFavorites(req, res) {
        try {
            const { userId } = req.params;
            
            const favoriteShops = await this.manageUserFavoritesUseCase.getFavorites(userId);
            res.status(200).json({
                success: true,
                favoriteShops
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = UserController;