class FetchAvailableSlotsUseCase {
  constructor(shopRepository, bookingRepository) {
    this.shopRepository = shopRepository;
    this.bookingRepository = bookingRepository;
  }

  isValidTimeFormat(timeString) {
    if (!timeString || typeof timeString !== 'string') return false;
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(timeString);
  }

  convertTimeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  }

  isSlotOverlapping(slot1Start, slot1End, slot2Start, slot2End) {
    const start1 = this.convertTimeToMinutes(slot1Start);
    const end1 = this.convertTimeToMinutes(slot1End);
    const start2 = this.convertTimeToMinutes(slot2Start);
    const end2 = this.convertTimeToMinutes(slot2End);

    return start1 < end2 && end1 > start2;
  }

  async execute(shopId, date) {
    try {
      const shop = await this.shopRepository.findslotById(shopId);
      if (!shop) {
        throw new Error('Shop not found');
      }

      if (!shop.availableSlots || !Array.isArray(shop.availableSlots)) {
        throw new Error('No available slots found for this shop');
      }

      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const bookings = await this.bookingRepository.findByShopAndDateRange(shopId, startOfDay, endOfDay);

      // Create a more detailed set of booked slots
      const bookedSlots = bookings.map(booking => {
        const [startTime, endTime] = booking.bookingSlot.split('-');
        return {
          startTime,
          endTime,
          bookingId: booking.id
        };
      });

      const currentTime = new Date();
      const currentHours = currentTime.getHours().toString().padStart(2, '0');
      const currentMinutes = currentTime.getMinutes().toString().padStart(2, '0');
      const currentTimeString = `${currentHours}:${currentMinutes}`;

      const availableSlots = shop.availableSlots.filter(slot => {
        // Validate slot data
        if (!slot || !this.isValidTimeFormat(slot.startTime) || !this.isValidTimeFormat(slot.endTime)) {
          console.warn(`Invalid slot format detected: ${JSON.stringify(slot)}`);
          return false;
        }

        try {
          // Check if slot is already booked
          const isBooked = bookedSlots.some(bookedSlot => 
            this.isSlotOverlapping(
              slot.startTime,
              slot.endTime,
              bookedSlot.startTime,
              bookedSlot.endTime
            )
          );

          // For today's slots, check if the slot start time is in the future
          const isToday = new Date(date).setHours(0,0,0,0) === new Date().setHours(0,0,0,0);
          const isFutureSlot = !isToday || this.convertTimeToMinutes(slot.startTime) > this.convertTimeToMinutes(currentTimeString);

          return !isBooked && isFutureSlot;
        } catch (error) {
          console.error(`Error processing slot: ${JSON.stringify(slot)}`, error);
          return false;
        }
      });

      // Sort available slots by start time
      return availableSlots.sort((a, b) => 
        this.convertTimeToMinutes(a.startTime) - this.convertTimeToMinutes(b.startTime)
      );

    } catch (error) {
      console.error('Error in FetchAvailableSlotsUseCase:', error);
      throw error;
    }
  }
}

module.exports = FetchAvailableSlotsUseCase;