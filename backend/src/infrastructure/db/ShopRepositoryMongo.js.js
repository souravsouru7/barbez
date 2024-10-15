const ShopRepository = require('../../domain/repositories/ShopRepository'); // Import the interface
const ShopModel = require('../models/ShopModel');
const BookingModel=require('../models/booking');
class ShopRepositoryMongo extends ShopRepository {
  async createShop(shopData) {
    const newShop = new ShopModel(shopData);
    return await newShop.save();
  }

  async findByOwnerId(ownerId) {
    return await ShopModel.findOne({ ownerId });
  }


  async findslotById(id) {
    const shop = await  ShopModel.findById(id);
    if (!shop) return null;
    return {
      id: shop._id.toString(),
      availableSlots: shop.availableSlots.map(slot => ({
        id: slot._id.toString(),
        startTime: slot.startTime,
        endTime: slot.endTime
      }))
    };
  }
  async findById(id) {
    console.log(`Searching for shop with ID: ${id}`);
    const shop = await ShopModel.findOne({ _id: id });
   
    return shop;
  }
  async save(shop) {
    return await shop.save();
  }

  async updateShop(id, shopData) {
    console.log("Updating Shop ID:", id, "with Data:", shopData);
    return await ShopModel.findByIdAndUpdate(id, shopData, { new: true });
  }
  async getAllShops(includeOfflineShops = false) {
    try {
      if (includeOfflineShops) {
        return await ShopModel.find({});
      } else {
        return await ShopModel.find({ isWorkModeOn: true });
      }
    } catch (error) {
      throw new Error('Error fetching shops from database');
    }
  }
  async searchByAddress(query) {
    try {
      console.log('Searching in database with query:', query); // Add this log
      return await ShopModel.find({ address: { $regex: query, $options: 'i' } });
    } catch (error) {
      console.error('Error in searchByAddress:', error); // Add this log
      throw new Error('Error searching shops by address');
    }
  }
  async getServicesByShopId(shopId) {
    try {
      const shop = await ShopModel.findById(shopId).select('services');
      if (!shop) {
        throw new Error('Shop not found');
      }
      return shop.services;
    } catch (error) {
      throw new Error(`Error retrieving services: ${error.message}`);
    }
  }

  async updateService(shopId, serviceId, updatedService) {
    const shop = await ShopModel.findById(shopId);
    const serviceIndex = shop.services.findIndex(service => service._id.toString() === serviceId);
    if (serviceIndex !== -1) {
      shop.services[serviceIndex] = { ...shop.services[serviceIndex], ...updatedService };
      return await shop.save();
    }
    throw new Error('Service not found');
  }

  async deleteService(shopId, serviceId) {
    const shop = await ShopModel.findById(shopId);
    const serviceIndex = shop.services.findIndex(service => service._id.toString() === serviceId);
    if (serviceIndex !== -1) {
      shop.services.splice(serviceIndex, 1);
      return await shop.save();
    }
    throw new Error('Service not found');
  }
  async addTimeSlot(shopId, timeSlot) {
    const shop = await ShopModel.findById(shopId);
    if (!shop) {
      throw new Error('Shop not found');
    }

    shop.availableSlots.push(timeSlot);
    return await shop.save();
  }

  async getTimeSlots(shopId, queryDate = null) {
    const shop = await ShopModel.findById(shopId).select('availableSlots');
    if (!shop) {
      throw new Error('Shop not found');
    }

    if (queryDate) {
      // If a date is provided, filter slots for that specific date
      const targetDate = new Date(queryDate);
      targetDate.setHours(0, 0, 0, 0); // Set time to midnight for consistent comparison

      return shop.availableSlots.filter(slot => 
        slot.date.getTime() === targetDate.getTime()
      );
    } else {
     
      return shop.availableSlots;
    }
  }
  async updateTimeSlot(shopId, timeSlotId, updatedTimeSlot) {
    const shop = await ShopModel.findById(shopId);
    if (!shop) {
      throw new Error('Shop not found');
    }
  
    const slotIndex = shop.availableSlots.findIndex(slot => slot._id.toString() === timeSlotId);
    if (slotIndex === -1) {
      throw new Error('Time slot not found');
    }
  
    // Update the time slot
    shop.availableSlots[slotIndex] = { ...shop.availableSlots[slotIndex], ...updatedTimeSlot };
    return await shop.save();
  }
  async deleteTimeSlot(shopId, timeSlotId) {
    const shop = await ShopModel.findById(shopId);
    if (!shop) {
      throw new Error('Shop not found');
    }
  
    const slotIndex = shop.availableSlots.findIndex(slot => slot._id.toString() === timeSlotId);
    if (slotIndex !== -1) {
      shop.availableSlots.splice(slotIndex, 1);
      return await shop.save();
    }
  
    throw new Error('Time slot not found');
  }
  async getBookingsByShopId(shopId) {
    return await BookingModel.find({ shopId })
      .populate('userId', 'name email') 
      .populate('shopId', 'shopName availableSlots') 
      .sort({ bookingDate: 1 });
  }
  
  
}

module.exports = ShopRepositoryMongo;
