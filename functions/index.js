const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { response } = require('express');
const stripe = require('stripe')(functions.config().stripe.key);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

/**
 * Create charge
 * 
 */
app.post('/charge/create', async (req, res) => {
  const total = req.query.total;

  if (total <= 0) {
    return;
  }

  console.log('Payment request received for: ', total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd'
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret
  });
});

/**
 * Get payment method details
 * 
 */
app.post('/method/get', async (req, res) => {
  const paymentMethod = req.query.pm;

  console.log('New request for payment method details: ', paymentMethod);
  const card = await stripe.paymentMethods.retrieve(paymentMethod);
  
  res.status(201).send(card.card);
})

exports.api = functions.https.onRequest(app);