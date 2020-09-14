const functions = require('firebase-functions');
const keys = require('./config/keys');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(keys.stripe);

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
 * Add a customer
 */
app.post('/charge/customer', async (req, res) => {
  console.log(req.body);

  console.log('Attaching payment method to customer');

  const customer = await stripe.customers.create({
    email: req.body.email,
    source: req.body.token.token.id
  });

  res.status(201).send({
    customer
  });
})

/**
 * Create a charge
 */

app.post('/charge/charge', async (req, res) => {
  console.log(req.body);
  
  const charge = await stripe.charges.create({
    amount: req.body.price,
    currency: 'usd',
    customer: req.body.customer,
    source: req.body.source
  });

  res.status(201).send({
    success: true,
    created: charge.created,
    id: charge.id,
    amount: charge.amount,
  });
})

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