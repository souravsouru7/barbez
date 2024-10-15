const PaymentModel = require('../models/payment');
const PaymentRepository = require('../../domain/repositories/paymentRepository');

class PaymentRepositoryImpl extends PaymentRepository {
  async create(payment) {
    const paymentModel = new PaymentModel(payment);
    return await paymentModel.save();
  }
}

module.exports = PaymentRepositoryImpl;
