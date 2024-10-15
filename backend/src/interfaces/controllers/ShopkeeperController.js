// backend/src/interfaces/controllers/ShopkeeperController.js
class ShopkeeperController {
    constructor(registerShopkeeperUseCase, loginShopkeeperUseCase, getShopkeeperByIdUseCase,updateShopkeeperUseCase) {
      this.registerShopkeeperUseCase = registerShopkeeperUseCase;
      this.loginShopkeeperUseCase = loginShopkeeperUseCase;
      this.getShopkeeperByIdUseCase = getShopkeeperByIdUseCase;
      this.updateShopkeeperUseCase = updateShopkeeperUseCase;
    }
  
    async register(req, res) {
      try {
        const { name, email, password, contactNumber } = req.body;
        const result = await this.registerShopkeeperUseCase.execute({ name, email, password, contactNumber });
        return res.status(201).json({ success: true, shopkeeper: result });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    }
  
    async login(req, res) {
      try {
        const { email, password } = req.body;
        const result = await this.loginShopkeeperUseCase.execute({ email, password });
        return res.status(200).json({ success: true, token: result.token, shopkeeper: result.shopkeeper });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    }
  
    async getShopkeeperById(req, res) {
      try {
        const { id } = req.params;
        const result = await this.getShopkeeperByIdUseCase.execute(id);
        if (result) {
          return res.status(200).json({ success: true, shopkeeper: result });
        } else {
          return res.status(404).json({ success: false, message: 'Shopkeeper not found' });
        }
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    }
    async updateShopkeeper(req, res) {
      try {
        const { id } = req.params;
        const shopkeeperData = req.body;
        const imageFilePath = req.file ? req.file.path : null; // Assuming you're using multer for file upload
        const updatedShopkeeper = await this.updateShopkeeperUseCase.execute(id, shopkeeperData, imageFilePath);
        return res.status(200).json({ success: true, shopkeeper: updatedShopkeeper });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    }
  }
  
  module.exports = ShopkeeperController;
  