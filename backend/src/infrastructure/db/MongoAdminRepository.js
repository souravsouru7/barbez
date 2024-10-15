// src/infrastructure/db/MongoAdminRepository.js
const AdminModel = require('../models/OtpModel');
const AdminRepository = require('../../domain/repositories/AdminRepository');
const Admin = require('../../domain/entities/Admin');
const ShopkeeperModel=require('../models/ShopkeeperModel')
const ShopkeeperRepository=require('../../domain/repositories/ShopkeeperRepository')
class MongoAdminRepository extends ShopkeeperRepository   {
    async findByEmail(email) {
        const adminData = await AdminModel.findOne({ email });
        if (!adminData) return null;
        return new Admin(adminData);
    }

    async save(admin) {
        const adminModel = new AdminModel(admin);
        await adminModel.save();
        return new Admin(adminModel);
    }
    async findById(id) {
        const shopkeeperData = await ShopkeeperModel.findById(id);
        if (!shopkeeperData) return null;
        return new Shopkeeper(shopkeeperData);
    }
}

module.exports = MongoAdminRepository;
