const resetSlotAvailability = async (shop) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (shop.lastResetDate < today) {
      shop.availableSlots = shop.availableSlots.map(slot => ({
        ...slot,
        isAvailable: true
      }));
      shop.lastResetDate = today;
      await shop.save();
    }
    return shop;
  };
  
  module.exports = { resetSlotAvailability };