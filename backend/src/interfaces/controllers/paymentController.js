class PaymentController {
  constructor(createPaymentUseCase) {
    this.createPaymentUseCase = createPaymentUseCase;
  }

  async createPayment(req, res) {
    try {
      const payment = await this.createPaymentUseCase.execute(req.body);
      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PaymentController;