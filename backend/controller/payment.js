const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51PD4wGRtNvLsN6CXGDr0ovP2pb7UsJjUJ0mpEJsbL47AaYE3qGBeiGp1n03VMMgr009AlNO5Lfh80LNKm4Rxbxwm00Ivtj0AU4"
);
router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Cuong",
      },
    });
    console.log(stripe);
    res.status(201).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(201).json({
      stripeApikey: process.env.STRIPE_API_KEY,
    });
  })
);

module.exports = router;
