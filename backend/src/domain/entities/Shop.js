class Shop {
  constructor(id, shopName, ownerId, address, contactNumber, shopImage, description, shopLicence, services, availableSlots, reviews, rating) {
    this.id = id;
    this.shopName = shopName;
    this.ownerId = ownerId;
    this.address = address;
    this.contactNumber = contactNumber;
    this.shopImage = shopImage;
    this.description = description;
    this.shopLicence = shopLicence;
    this.services = services;
    this.availableSlots = availableSlots;
    this.reviews = reviews;
    this.rating = rating;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = Shop;