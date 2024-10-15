// src/interfaces/controllers/AdminController.js


const GetAllShopkeepers = require('../../application/use-case/Admin/GetAllShopkeepers');
const VerifyShopkeeperAccount = require('../../application/use-case/Admin/VerifyShopkeeperAccount');
const ShopkeeperRepository = require('../../domain/repositories/ShopkeeperRepository');
const GetShopkeeperById = require('../../application/use-case/Admin/GetShopkeeperById');
const ShopkeeperModel = require('../../infrastructure/models/ShopkeeperModel');
const TwilioService = require('../../application/services/TwilioService');
const OtpService = require('../../application/services/OtpService');
const AdminRepository = require('../../domain/repositories/AdminRepository');
const AdminAuthUseCase = require('../../application/use-case/Admin/AdminAuthUseCase');




const shopkeeperRepository = new ShopkeeperRepository(ShopkeeperModel);
class AdminController {
    constructor({ adminService }) {
        this.adminService = adminService;
    }

    static async getAllShopkeepers(req, res) {
        try {
            const getAllShopkeepers = new GetAllShopkeepers(shopkeeperRepository);
            const shopkeepers = await getAllShopkeepers.execute();
            res.json(shopkeepers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    
    static async verifyShopkeeper(req, res) {
        try {
            const { id } = req.params;
            const verifyShopkeeperAccount = new VerifyShopkeeperAccount(shopkeeperRepository);
            const updatedShopkeeper = await verifyShopkeeperAccount.execute(id);
            res.json(updatedShopkeeper);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    static async getShopkeeperById(req, res) {
        try {
            const { id } = req.params;
            const getShopkeeperById = new GetShopkeeperById(shopkeeperRepository);
            const shopkeeper = await getShopkeeperById.execute(id);

            if (!shopkeeper) {
                return res.status(404).json({ message: 'Shopkeeper not found' });
            }

            
            const shopkeeperData = {
                ...shopkeeper._doc, 
                shopLicenseUrl: shopkeeper.shopLicense 
                    ? `${req.protocol}://${req.get('host')}/uploads/${shopkeeper.shopLicense}` 
                    : null,
            };

            res.json(shopkeeperData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async sendOtp(req, res) {
        try {
            const { phoneNumber } = req.body;
            const message = await AdminAuthUseCase.sendOtp(phoneNumber);
            res.status(200).json({ message });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // New method to handle verifying OTP
    static async verifyOtp(req, res) {
        try {
            const { phoneNumber, otp } = req.body;
            const token = await AdminAuthUseCase.verifyOtp(phoneNumber, otp);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

module.exports = AdminController;
