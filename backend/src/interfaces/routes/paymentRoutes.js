const express = require('express');
const router = express.Router();
const PaymentController = require("../controllers/paymentController");
const CreatePaymentUseCase = require('../../application/use-case/payment/CreatePaymentUseCase');
const PaymentRepositoryImpl = require('../../infrastructure/db/PaymentRepositoryImpl');

const paymentRepository = new PaymentRepositoryImpl();
const createPaymentUseCase = new CreatePaymentUseCase(paymentRepository);
const paymentController = new PaymentController(createPaymentUseCase);

router.post('/', (req, res) => paymentController.createPayment(req, res));

module.exports = router;
