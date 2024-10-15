// src/interfaces/controllers/slotController.js

const FetchAvailableSlotsUseCase = require('../../application/use-case/shopkeeper/shopuser/fetchAvailableSlots');
const MongoBookingRepository = require('../../infrastructure/db/BookingRepositoryImpl.js');
const MongoShopRepository = require('../../infrastructure/db/ShopRepositoryMongo.js');

class SlotController {
  constructor() {
    const shopRepository = new MongoShopRepository();
    const bookingRepository = new MongoBookingRepository();
    this.fetchAvailableSlotsUseCase = new FetchAvailableSlotsUseCase(shopRepository, bookingRepository);
  }

  async getAvailableSlots(req, res) {
    try {
      const { shopId, date } = req.query;
      if (!shopId || !date) {
        return res.status(400).json({ error: 'Missing shopId or date parameter' });
      }
      const availableSlots = await this.fetchAvailableSlotsUseCase.execute(shopId, new Date(date));
      res.json(availableSlots);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new SlotController();