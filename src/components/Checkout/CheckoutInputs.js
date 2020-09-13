import React, { useState, useEffect } from 'react';

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Link, useHistory} from 'react-router-dom';
import { useStateValue } from '../../StateProvider';

import axios from '../../reducer/axios';
import { db } from '../../config/firebase';

import returnIcon from '../../assets/return.svg';

/**
 * Stripe element style options
 */
const options = {
  style: {
    base: {
      color: '#333',
      placeholder: '#8b8b8b',
      fontFamily: "'Arimo', sans-serif",
      fontSize: '18px'
    }
  }
}

/**
 * Checkout inputs component, all the inputs required
 * for checkout
 * 
 */
function CheckoutInputs () {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);

  const [{ cart, user }, dispatch] = useStateValue();

  /**
   * Handle payment submission
   * 
   * @param {any} e event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    /* Get stripe paymentIntent payload */
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement)
      }
    }).then((res) => {
      if (res.hasOwnProperty('paymentIntent')) {

        /* Add the order to the users order collection */
        db
          .collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(res.paymentIntent.id)
          .set({
            cart,
            amount: res.paymentIntent.amount,
            created: res.paymentIntent.created
          });
        
        /* Save the payment method for the user */
        db
          .collection('users')
          .doc(user?.uid)
          .collection('methods')
          .doc(res.paymentIntent.payment_method)
          .set({
            paymentMethod: res.paymentIntent.payment_method
          });

        setError('');
        setProcessing(false);

        /* Empty the cart */
        dispatch({
          type: 'EMPTY_CART'
        });

        /* Send them to orders page */
        history.replace('/orders');
      } else {
        setProcessing(false);
        setError('Error processing payment');
      }
    });
  }

  useEffect(() => {
    /* Get the users payment */
    if (user) {
      db
        .collection('users')
        .doc(user?.uid)
        .collection('methods')
        .onSnapshot(methods => {
          methods.forEach(method => {
            getPayments(method.data().paymentMethod);
          })
        })
    }

    /* Get payment method details */
    const getPayments = async (method) => {
      const res = await axios({
        method: 'post',
        url: `method/get?pm=${method}`
      });
      console.log(res.data);
      setPayments([...payments, {
        lastFour: res.data.last4,
        brand: res.data.brand,
      }]);
    }

    /* Get client secret whenever price of cart is updated */
    const getClientSecret = async () => {
      const res = await axios({
        method: 'post',
        url: `/charge/create?total=${cart.reduce((a, b) => a + (b.price * b.count), 0).toFixed(2) * 100}`
      });
      setClientSecret(res.data.clientSecret);
    }
    getClientSecret();
  }, [cart]);

  console.log(payments);

  return (
    <div className="checkout__inputs">
      <div className="input__title">Add new shipping address</div>
      {/* Address */}
      <div className="input--full">
        <div className="input--half">
          <div className="input__description">First Name</div>
          <input type="text" className="input" placeholder="John" />
        </div>
        <div className="input--half">
          <div className="input__description">Last Name</div>
          <input type="text" className="input" placeholder="Doe" />
        </div>
      </div>
      <div className="input__description">Address</div>
      <input type="text" className="input" placeholder="123 My Street" />
      <div className="input__description">Apartment, suite, etc (optional)</div>
      <input type="text" className="input" placeholder="" />
      <div className="input--full">
        <div className="input--third">
          <div className="input__description">Country/Region</div>
          <input type="text" className="input" placeholder="United States" />
        </div>
        <div className="input--third">
          <div className="input__description">State</div>
          <input type="text" className="input" placeholder="New York" />
        </div>
        <div className="input--third">
          <div className="input__description">Zipcode</div>
          <input type="text" className="input" placeholder="12345" />
        </div>
      </div>
      <div style={{marginTop: '32px'}} className="input__title">Add new payment method</div>
      {/* Payment form */}
      <form onSubmit={handleSubmit}>
        <div className="input__description">Card number</div>
        <CardNumberElement
          className="input stripe__input"
          options={options}
        />
        <div className="input__description">Card holder</div>
        <input type="text" className="input" placeholder="John Doe" />
        <div className="input--full">
          <div className="input--half">
            <div className="input__description">Expiry</div>
            <CardExpiryElement
              className="input stripe__input"
              options={options}
            />
          </div>
          <div className="input--half">
            <div className="input__description">CVV</div>
            <CardCvcElement
              className="input stripe__input"
              options={options}
            />
          </div>
        </div>
        <div className="payment-button__wrapper">
          <Link to="/">
            <div className="continue__shopping">
              <img src={returnIcon} alt="" className="return__carot"/>
              Continue Shopping
            </div>
          </Link>
          <button className="button button--orange button--payment">
            {processing ? 'Processing Payment...' : 'Complete Order'}
          </button>
        </div>
        <div className="error__message">{error}</div>
      </form>
    </div>
  );
}

export default CheckoutInputs;