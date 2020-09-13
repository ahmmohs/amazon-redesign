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

import returnIcon from '../../assets/return.svg';

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

function CheckoutInputs () {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState(null);

  const [{ cart }, dispatch] = useStateValue();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement)
      }
    }).then(({ paymentIntent }) => {
      console.log(paymentIntent);
      setSuccess(true);
      setError('');
      setProcessing(false);

      history.replace('/orders');
    })
  }

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        url: `/charge/create?total=${cart.reduce((a, b) => a + (b.price * b.count), 0).toFixed(2) * 100}`
      });
      setClientSecret(response.data.clientSecret);
    }

    getClientSecret();
  }, [cart])

  return (
    <div className="checkout__inputs">
      <div className="input__title">Add new shipping address</div>
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
      </form>
    </div>
  );
}

export default CheckoutInputs;