// src/domain/entities/Admin.js
class Admin {
    constructor({ id, email, password, isVerified = false }) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.isVerified = isVerified;
    }
}

module.exports = Admin;
