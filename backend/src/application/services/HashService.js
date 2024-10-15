// backend/src/application/services/HashService.js
const bcrypt = require('bcrypt');

class HashService {
  async hash(password) {
    return await bcrypt.hash(password, 10);
  }

  async compare(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

module.exports = HashService;
