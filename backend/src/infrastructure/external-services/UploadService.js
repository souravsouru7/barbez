const cloudinary = require('cloudinary').v2;

class UploadService {
    constructor() {
        // Make sure this is correctly configured
        cloudinary.config({
            cloud_name: 'dqf5ttbb7', // Replace with your Cloudinary cloud name
            api_key: '236875416421114', // Replace with your Cloudinary API key
            api_secret: '4P-wKxS82Cj4WYNMJVee22jvK-s'
        });
    }

    async uploadFile(file) {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result.secure_url);
            }).end(file.buffer);
        });
    }
}

module.exports = UploadService;
