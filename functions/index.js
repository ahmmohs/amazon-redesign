const functions = require('firebase-functions');
const keys = require('./config/keys');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(keys.stripe);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

/**
 * Create a customer
 * 
 */
app.post('/charge/customer', async (req, res) => {
  /* Create the customer and attach the source to them */
  const customer = await stripe.customers.create({
    email: req.body.email,
    source: req.body.token.token.id
  });

  /* Send the customer back */
  res.status(201).send({
    customer
  });
});

/**
 * Update a customer
 * 
 */
app.post('/customer/update', async (req, res) => {
  const source = await stripe.customers.createSource(req.body.customerId, {source: req.body.source.token.id});
  const customer = await stripe.customers.retrieve(req.body.customerId);

  res.status(201).send({
    customer,
    source
  });
});

/**
 * Delete a source
 * 
 */
app.post('/customer/delete', async (req, res) => {
  await stripe.customers.deleteSource(req.body.customerId, req.body.cardId);
  const customer = await stripe.customers.retrieve(req.body.customerId);
  res.status(201).send(customer);
});

/**
 * Create a charge
 * 
 */
app.post('/charge/create', async (req, res) => {
  console.log('Im coming from here');
  console.log(req.body);
  /* Create the charge */
  const charge = await stripe.charges.create({
    amount: req.body.price,
    currency: 'usd',
    customer: req.body.customer,
    source: req.body.source
  });

  /* Send back status, when it was created, id, and amount */
  res.status(201).send({
    success: true,
    created: charge.created,
    id: charge.id,
    amount: charge.amount,
  });
});

exports.api = functions.https.onRequest(app);