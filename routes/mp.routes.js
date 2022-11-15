const express = require("express");
const router = express.Router();

const PaymentController = require("../controllers/payment.controller");
const PaymentService = require("../services/mp.service");

const PaymentInstance = new PaymentController(new PaymentService());

router.get("/", function (req, res, next) {
  return PaymentInstance.checkSubs(req, res)
});

router.get("/payment", function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res);
});

router.get("/subscription", function (req, res, next) {
  PaymentInstance.getSubscriptionLink(req, res);
});

module.exports = router;