const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserRepository = require('../../domain/repositories/UserRepository');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phoneNumber: String,
    isVerified: Boolean,
    profileImage: String,
    otp: String,           
    otpExpires: Date,
    favoriteShops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }]
});

const UserModel = mongoose.model('User', userSchema);

class MongoUserRepository extends UserRepository {
    async createUser(user) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = new UserModel({
            ...user,
            password: hashedPassword,
        });
        return await newUser.save();
    }

    async findByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async updateUser(user) {
        return await UserModel.updateOne({ email: user.email }, user);
    }

    async verifyUser(email) {
        return await UserModel.updateOne({ email }, { isVerified: true });
    }

    async saveOtp(email, otp, otpExpires) {
        return await UserModel.updateOne({ email }, { otp, otpExpires });
    }

    async resetPassword(email, otp, newPassword) {
        const user = await UserModel.findOne({ email, otp, otpExpires: { $gt: new Date() } });
        if (!user) {
            throw new Error("Invalid or expired OTP");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = null;
        user.otpExpires = null;
        return await user.save();
    }

    async findById(userId) {
        return await UserModel.findById(userId).select('-password -otp -otpExpires');
    }

    async updateUserById(userId, userData) {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                { $set: userData },
                { new: true, runValidators: true }
            ).select('-password -otp -otpExpires');
            
            if (!updatedUser) {
                throw new Error('User not found');
            }
            
            return updatedUser;
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    async addToFavorites(userId, shopId) {
        const user = await UserModel.findById(userId);
        if (!user) throw new Error('User not found');
        
        if (!user.favoriteShops.includes(shopId)) {
            user.favoriteShops.push(shopId);
            await user.save();
        }
        return user;
    }

    async removeFromFavorites(userId, shopId) {
        const user = await UserModel.findById(userId);
        if (!user) throw new Error('User not found');
        
        user.favoriteShops = user.favoriteShops.filter(id => id.toString() !== shopId);
        await user.save();
        return user;
    }

    async getFavoriteShops(userId) {
        const user = await UserModel.findById(userId).populate('favoriteShops');
        if (!user) throw new Error('User not found');
        
        return user.favoriteShops;
    }
}

module.exports = MongoUserRepository;