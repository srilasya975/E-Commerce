import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const paymentController = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      description: "TEST PAYMENT",
      metadata: { integration_check: "accept_payment" },
      shipping: req.body.shipping,
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

export const sendStripeApi = async (req, res, next) => {
  try {
    res.status(200).json({
      stripeApiKey: process.env.STRIPE_API_KEY,
    });
  } catch (error) {
    next(error);
  }
};
