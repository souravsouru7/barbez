

class ShopController {
  constructor(createShopUseCase, updateShopUseCase, cloudinaryService, shopRepository, getAllShopsUseCase,searchShopsByAddressUseCase,addServicesUseCase,  updateServiceUseCase,  // Use case for updating service
    deleteServiceUseCase,addTimeSlotUseCase, getTimeSlotsUseCase,updateTimeSlotUseCase,deleteTimeSlotUseCase,getShopByIdUseCase, getShopBookingsUseCase,toggleShopWorkModeUseCase) {
    this.createShopUseCase = createShopUseCase;
    this.updateShopUseCase = updateShopUseCase;
    this.cloudinaryService = cloudinaryService;
    this.shopRepository = shopRepository;
    this.getAllShopsUseCase = getAllShopsUseCase;
    this.searchShopsByAddressUseCase = searchShopsByAddressUseCase;
    this.addServicesUseCase = addServicesUseCase; 
    this.updateServiceUseCase = updateServiceUseCase;
    this.deleteServiceUseCase = deleteServiceUseCase; 
    this.addTimeSlotUseCase = addTimeSlotUseCase;  
    this.getTimeSlotsUseCase = getTimeSlotsUseCase;
    this.updateTimeSlotUseCase = updateTimeSlotUseCase;
    this.deleteTimeSlotUseCase = deleteTimeSlotUseCase;
    this.getShopByIdUseCase = getShopByIdUseCase;
    this.getShopBookingsUseCase = getShopBookingsUseCase;
    this.toggleShopWorkModeUseCase=toggleShopWorkModeUseCase;
  }

  async createShop(req, res) {
    try {
      const shopData = req.body;
      const shopImageFile = req.files.shopImage[0].path;
      const licenseFile = req.files.licenseImage[0].path;

      const newShop = await this.createShopUseCase.execute(shopData, shopImageFile, licenseFile);
      res.status(201).json(newShop);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getShopByOwnerId(req, res) {
    try {
      const ownerId = req.params.ownerId;
      const shop = await this.shopRepository.findByOwnerId(ownerId);

      if (!shop) {
        return res.status(404).json({ message: 'Shop not found' });
      }

      res.status(200).json(shop);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateShop(req, res) {
    try {
      const shopId = req.params.id;
      let shopData = req.body;
  
      // Sanitize input data to remove any extra spaces from field names
      shopData = Object.keys(shopData).reduce((acc, key) => {
        const trimmedKey = key.trim();
        acc[trimmedKey] = shopData[key];
        return acc;
      }, {});
  
      const shopImageFile = req.files.shopImage ? req.files.shopImage[0].path : null;
      const licenseFile = req.files.licenseImage ? req.files.licenseImage[0].path : null;
  
      const updatedShop = await this.updateShopUseCase.execute(shopId, shopData, shopImageFile, licenseFile, this.cloudinaryService);
  
      res.status(200).json(updatedShop);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllShops(req, res) {
    try {
      
      const shops = await this.shopRepository.getAllShops(isShopkeeper);
      res.status(200).json(shops);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getShopById(req, res) {
    try {
      const shopId = req.params.shopId;
      const shop = await this.getShopByIdUseCase.execute(shopId);
      res.status(200).json(shop);
    } catch (error) {
      if (error.message === 'Shop not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }


  
  async searchShopsByAddress(req, res) {
    try {
      const { query } = req.query;
      console.log('Searching for shops with query:', query); // Add this log
      const shops = await this.searchShopsByAddressUseCase.execute(query);
      res.status(200).json({ success: true, shops });
    } catch (error) {
      console.error('Error in searchShopsByAddress:', error); // Add this log
      res.status(400).json({ success: false, message: error.message });
    }
  }
  async addServices(req, res) {
    try {
      const shopId = req.params.id;
      const newServices = req.body.services; // The services being added, assumed to be an array

      const updatedShop = await this.addServicesUseCase.execute(shopId, newServices);
      res.status(200).json(updatedShop);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getServices(req, res) {
    try {
      const shopId = req.params.id; // Get shop ID from the request parameters
      const services = await this.shopRepository.getServicesByShopId(shopId); // Fetch the services using the repository
      res.status(200).json({ success: true, services });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  async updateService(req, res) {
    try {
      const { id: shopId, serviceId } = req.params;
      const updatedService = req.body;

      const updatedShop = await this.updateServiceUseCase.execute(shopId, serviceId, updatedService);
      res.status(200).json(updatedShop);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteService(req, res) {
    try {
      const { id: shopId, serviceId } = req.params;
      console.log(`Attempting to delete service. ShopId: ${shopId}, ServiceId: ${serviceId}`);

      const updatedShop = await this.deleteServiceUseCase.execute(shopId, serviceId);
      console.log(`Service deleted successfully. Updated shop:`, updatedShop);

      res.status(200).json(updatedShop);
    } catch (error) {
      console.error(`Error deleting service:`, error);
      res.status(500).json({ error: error.message });
    }
  }
  async addTimeSlot(req, res) {
    try {
      const { shopId } = req.params;
      const { startTime, endTime } = req.body;
      
      if (!startTime || !endTime) {
        return res.status(400).json({ error: 'Start time and end time are required' });
      }

      const updatedShop = await this.addTimeSlotUseCase.execute(shopId, startTime, endTime);
      res.status(200).json(updatedShop);
    } catch (error) {
      console.error('Error adding time slot:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getTimeSlots(req, res) {
    try {
      const { shopId } = req.params;
      const slots = await this.getTimeSlotsUseCase.execute(shopId);
      res.status(200).json(slots);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateTimeSlot(req, res) {
    try {
      const { shopId, slotId } = req.params;
      const { startTime, endTime } = req.body;
      const result = await this.updateTimeSlotUseCase.execute(shopId, slotId, { startTime, endTime });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteTimeSlot(req, res) {
    try {
      const { shopId, slotId } = req.params;
      const result = await this.deleteTimeSlotUseCase.execute(shopId, slotId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getShopBookings(req, res) {
    try {
      const shopId = req.params.shopId;
      const bookings = await this.getShopBookingsUseCase.execute(shopId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async toggleWorkMode(req, res) {
    try {
      const { id } = req.params;
      const updatedShop = await this.toggleShopWorkModeUseCase.execute(id);
      res.status(200).json(updatedShop);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
  
  
  


module.exports = ShopController;
