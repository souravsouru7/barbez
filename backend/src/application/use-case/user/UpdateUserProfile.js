class UpdateUserProfile {
    constructor(userRepository, cloudinaryService) {
        this.userRepository = userRepository;
        this.cloudinaryService = cloudinaryService;
    }

    async execute(userId, userData, imageFile) {
        try {
            // If there's an image file, upload it to Cloudinary
            if (imageFile) {
                const imageUrl = await this.cloudinaryService.uploadImage(imageFile.path);
                userData.profileImage = imageUrl;
            }

            // Update user data in the database
            const updatedUser = await this.userRepository.updateUserById(userId, userData);
            return updatedUser;
        } catch (error) {
            throw new Error(`Failed to update user profile: ${error.message}`);
        }
    }
}

module.exports = UpdateUserProfile;