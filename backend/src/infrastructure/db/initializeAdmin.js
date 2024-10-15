// src/infrastructure/db/initializeAdmin.js
const bcrypt = require('bcrypt');
const AdminModel = require('../models/OtpModel');

const initializeAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        const existingAdmin = await AdminModel.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            const newAdmin = new AdminModel({
                email: adminEmail,
                password: hashedPassword,
                isVerified: true,
            });
            await newAdmin.save();
            console.log('Predefined admin account created.');
        } else {
            console.log('Predefined admin account already exists.');
        }
    } catch (error) {
        console.error('Error initializing admin:', error);
    }
};

module.exports = initializeAdmin;
