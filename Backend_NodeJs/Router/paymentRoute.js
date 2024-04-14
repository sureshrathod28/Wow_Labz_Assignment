const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const paymentRouter = express.Router();

const razorpay = new Razorpay({
  key_id: `${process.env.RAZOR_KEY_ID}`,
  key_secret:`${process.env.RAZOR_SECRET_KEY}`,
});

paymentRouter.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount,
    currency: 'INR',
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({ orderId: response.id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Server Error');
  }
});

paymentRouter.get('/order-details/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  // Replace this with your logic to fetch order details from your database
  const orderDetails = {
    orderId,
    // Add other details as needed (e.g., items, total amount, customer info, etc.)
  };

  res.json(orderDetails);
});


module.exports = paymentRouter;
