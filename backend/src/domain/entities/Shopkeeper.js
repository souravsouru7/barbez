class Shopkeeper {
    constructor({ name, email, password, contactNumber }) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.contactNumber = contactNumber;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
  
  module.exports = Shopkeeper;
  