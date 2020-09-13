const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { response } = require('express');
const stripe = require('stripe')('sk_test_gIXBrBQyTsHrs6E3rdG6QKdV00OS7mf75P');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

/**
 * Create charge
 * 
 */
app.post('/charge/create', async (req, res) => {
  const total = req.query.total;

  console.log('Payment request received for: ', total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd'
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret
  });
});

exports.api = functions.https.onRequest(app);