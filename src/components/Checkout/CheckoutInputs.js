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
import { db } from '../../utils/firebase';

import SavedCheckoutInput from './SavedCheckoutInput';

import returnIcon from '../../assets/return.svg';

/**
 * Stripe element style options
 */
const options = {
  style: {
    base: {
      color: '#333',
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

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const [address, setAddress] = useState({
    fName: '',
    lName: '',
    line1: '',
    line2: '',
    country: '',
    state: '',
    city: '',
    postal_code: ''
  });
  const [addresses, setAddresses] = useState([]);
  const [usingAddress, setUsingAddress] = useState(null);

  const [customerId, setCustomerId] = useState(null);
  const [payments, setPayments] = useState([]);
  const [cardComplete, setCardComplete] = useState({
    cardNumber: false,
    cardDate: false,
    cardHolder: '',
    cardCvc: false,
  });
  const [usingPayment, setUsingPayment] = useState(null);

  const [{ cart, user }, dispatch] = useStateValue();

  const deleteAddress = (id) => {
    db
      .collection('users')
      .doc(user?.uid)
      .collection('addresses')
      .doc(id)
      .delete();
  }

  const deleteCard = async (id) => {
    const customer = await axios({
      method: 'post',
      url: 'customer/delete',
      data: {
        cardId: id,
        customerId
      }
    });

    console.log(customer.data);

    db
      .collection('users')
      .doc(user?.uid)
      .collection('sources')
      .doc(customerId)
      .set(customer.data)
  }

  /**
   * Handles address inputs
   * 
   * @param {any} e event
   * @param {string} key key of address to update
   */
  const handleInput = (e, key) => {
    setAddress({...address, [key]: e.target.value});
  }

  /**
   * Validates stripe elements
   * 
   */
  const handleCard = (e) => {
    if (e.complete) {
      switch (e.elementType) {
        case 'cardNumber':
          setCardComplete({...cardComplete, cardNumber: true});
          break;
        case 'cardExpiry':
          setCardComplete({...cardComplete, cardDate: true});
          break;
        case 'cardCvc':
          setCardComplete({...cardComplete, cardCvc: true});
          break;
        default:
          break
      }
    }
  }

  const handleAddress = (i) => {
    setUsingAddress(i);
    setAddress(addresses[i]);
  }

  /**
   * Checks if form is ready to be submitted
   * 
   */
  const checkComplete = () => {
    if (
      address.fName !== ''
      && address.lName !== ''
      && address.line1 !== ''
      && address.country !== ''
      && address.state !== ''
      && address.city !== ''
      && address.postal_code !== ''
      && cardComplete.cardNumber
      && cardComplete.cardDate
      && cardComplete.cardHolder !== ''
      && cardComplete.cardCvc
    ) return true;
    return false;
  }

  /**
   * Handle payment submission
   * 
   * @param {any} e event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

     if (!checkComplete()) {
       setError('Incomplete form!')
       return;
     }
    
     setProcessing(true);

    if (customerId === null) {
      const card = elements.getElement(CardNumberElement);
      const token = await stripe.createToken(card, {name: cardComplete.cardHolder})
  
      const customer = await axios({
        method: 'post',
        url: 'charge/customer',
        data: {
          token,
          email: user.email
        }
      });
    
      const charge = await axios({
        method: 'post',
        url: 'charge/create',
        data: {
          customer: customer.data.customer.id,
          price: cart.reduce((a, b) => a + (b.price * b.count), 0).toFixed(2) * 100,
          source: customer.data.customer.default_source
        }
      });

      if (charge.data.success) {
        db
          .collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(charge.data.id)
          .set({
            cart,
            amount: charge.data.amount,
            created: charge.data.created
          });
  
        db
          .collection('users')
          .doc(user?.uid)
          .collection('sources')
          .doc(customer.data.customer.id)
          .set(customer.data.customer);

        db
          .collection('users')
          .doc(user?.uid)
          .collection('addresses')
          .doc(`${address.fName}${address.lName}${Math.random() * 1000}`)
          .set(address);
        
        setError('');
        setProcessing(false);

        /* Empty the cart */
        dispatch({
          type: 'EMPTY_CART'
        });

        /*Send them to orders page */
        history.replace('/orders');
      } else {
        setProcessing(false);
        setError('Error processing payment');
      }
    } else {
      let customer = {};
      let source = '';
      if (usingPayment == null) {
        const card = elements.getElement(CardNumberElement);
        source = await stripe.createToken(card, {name: cardComplete.cardHolder})
        customer = await axios({
          method: 'post',
          url: 'customer/update',
          data: {
            customerId,
            source,
          }
        });
        source = customer.data.source.id;
      } else {
        source = payments[usingPayment].id;
      }

      const charge = await axios({
        method: 'post',
        url: 'charge/create',
        data: {
          customer: customerId,
          price: cart.reduce((a, b) => a + (b.price * b.count), 0).toFixed(2) * 100,
          source,
        }
      });

      if (charge.data.success) {
        db
          .collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(charge.data.id)
          .set({
            cart,
            amount: charge.data.amount,
            created: charge.data.created
          });

        console.log(addresses.length, usingAddress);
        if ((addresses.length > 0 && usingAddress === null) || addresses.length === 0) {
          console.log('Adding address for some reason??');
          db
            .collection('users')
            .doc(user?.uid)
            .collection('addresses')
            .doc(`${address.fName}${address.lName}${Math.random() * 1000}`)
            .set(address);
        }

        console.log(payments.length, usingPayment)
        if ((payments.length > 0 && usingPayment === null) || payments.length === 0) {
          console.log('Updating customer info!!');
          db
            .collection('users')
            .doc(user?.uid)
            .collection('sources')
            .doc(customer.data.customer.id)
            .set(customer.data.customer); 
        }
        
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
    }
  }

  useEffect(() => {
    /* If user is signed in, check for their payment methods/addresses */
    if (user) {

      /* Get payment methods */
      db
        .collection('users')
        .doc(user?.uid)
        .collection('sources')
        .onSnapshot(ids => {
          if (ids.docs.length > 0) {
            const costumer = ids.docs[0].data();
            setCustomerId(costumer.id);
            if (costumer.sources.data.length > 0) {
              setPayments(costumer.sources.data.map(source => ({
                id: source.id,
                lastFour: source.last4,
                brand: source.brand,
                name: source.name
              })));
              setUsingPayment(0);
              setCardComplete({
                cardCvc: true,
                cardDate: true,
                cardHolder: 'f',
                cardNumber: true
              });
            } else {
              setPayments([]);
              setUsingPayment(null);
              setCardComplete({
                cardCvc: false,
                cardDate: false,
                cardHolder: '',
                cardNumber: false
              });
            }
          }
        })
      
      /* Get addresses */
      db
        .collection('users')
        .doc(user?.uid)
        .collection('addresses')
        .onSnapshot(sAddresses => {
          if (sAddresses.docs.length > 0) {
            setAddresses(sAddresses.docs.map(addy => ({...addy.data(), id: addy.id})));
            setUsingAddress(0);
            setAddress(sAddresses.docs[0].data());
          } else {
            setAddresses([]);
            setUsingAddress(null);
            setAddress({
              fName: '',
              lName: '',
              line1: '',
              line2: '',
              country: '',
              state: '',
              city: '',
              postal_code: ''
            });
          }
        });
    }
    setLoading(false);
  }, [user]);

  return (
    <div className="checkout__inputs">
      {
        loading ? (
          <div className="loading__container">
            Loading
            <div className="loader"></div>
          </div>
        ) : (
          <div className="input__wrapper">
            {
              (usingAddress !== null) ? (
                <div className="input__wrapper">
                  <div className="input__title">
                    Select address
                    <div className="new__method" onClick={() => setUsingAddress(null)}>or add new address</div>
                  </div>
                  {
                    addresses.map((addy, i) => (
                      <SavedCheckoutInput
                        key={i}
                        id={addy.id}
                        title={`${addy.fName} ${addy.lName}`}
                        subtitle={`${addy.line1} ${addy.line2}`}
                        description={`${addy.state} ${addy.postal_code}`}
                        currentlySelected={usingAddress}
                        index={i}
                        selectFn={handleAddress}
                        deleteFn={deleteAddress}
                      />
                    ))
                  }
              </div>
              ) : (
                <div>
                  <div className="input__title">
                    Add new shipping address
                    {addresses.length > 0 && <div className="new__method" onClick={() => setUsingAddress(0)}>or select existing</div>}
                  </div>
                  {/* Address */}
                  <div className="input--full">
                    <div className="input--half">
                      <div className="input__description">First Name</div>
                      <input
                        value={address.fName}
                        type="text"
                        className={(error !== '' && address.fName === '') ? 'input input--error' : 'input'}
                        placeholder="John"
                        onChange={e => handleInput(e, 'fName')}
                      />
                    </div>
                    <div className="input--half">
                      <div className="input__description">Last Name</div>
                      <input
                        value={address.lName}
                        type="text"
                        className={(error !== '' && address.lName === '') ? 'input input--error' : 'input'}
                        placeholder="Doe"
                        onChange={e => handleInput(e, 'lName')}
                      />
                    </div>
                  </div>
                  <div className="input__description">Address</div>
                  <input
                    value={address.line1}
                    type="text"
                    className={(error !== '' && address.line1 === '') ? 'input input--error' : 'input'}
                    placeholder="123 My Street"
                    onChange={e => handleInput(e, 'line1')}
                  />
                  <div className="input--full">
                    <div className="input--twird">
                      <div className="input__description">Apartment, suite, etc (optional)</div>
                      <input
                        value={address.line2}
                        type="text"
                        className="input"
                        placeholder=""
                        onChange={e => handleInput(e, 'line2')}
                      />
                    </div>
                    <div className="input--third">
                      <div className="input__description">City</div>
                      <input
                        value={address.city}
                        type="text"
                        className={(error !== '' && address.city === '') ? 'input input--error' : 'input'}
                        placeholder=""
                        onChange={e => handleInput(e, 'city')}
                      />
                    </div>
                  </div>
                  <div className="input--full">
                    <div className="input--third">
                      <div className="input__description">Country/Region</div>
                      <input
                        value={address.country}
                        type="text"
                        className={(error !== '' && address.country === '') ? 'input input--error' : 'input'}
                        placeholder="United States"
                        onChange={e => handleInput(e, 'country')}
                      />
                    </div>
                    <div className="input--third">
                      <div className="input__description">State</div>
                      <input
                        value={address.state}
                        type="text"
                        className={(error !== '' && address.state === '') ? 'input input--error' : 'input'}
                        placeholder="New York"
                        onChange={e => handleInput(e, 'state')}
                      />
                    </div>
                    <div className="input--third">
                      <div className="input__description">Zipcode</div>
                      <input
                        value={address.postal_code}
                        type="text"
                        className={(error !== '' && address.postal_code === '') ? 'input input--error' : 'input'}
                        placeholder="12345"
                        onChange={e => handleInput(e, 'postal_code')}
                      />
                    </div>
                  </div>
                </div>
              )
            }
            {/* Display payment form, if they want to add new payment method
                or else display the selector for the previous payment method */}
            {
              (usingPayment !== null) ? (
                <div>
                  <div style={{marginTop: '16px'}} className="input__title">
                    Select payment method
                    <div className="new__method" onClick={() => {
                      setUsingPayment(null);
                      setCardComplete({...cardComplete, cardHolder: ''});
                    }}>
                      or add new method
                    </div>
                  </div>
                  {
                    payments.map((payment, i) => (
                      <SavedCheckoutInput
                        key={i}
                        id={payment.id}
                        title={payment.name}
                        subtitle={payment.brand}
                        description={`ending with ${payment.lastFour}`}
                        currentlySelected={usingPayment}
                        index={i}
                        selectFn={setUsingPayment}
                        deleteFn={deleteCard}
                      />
                    ))
                  }
                </div>
              ) : (
                <div>
                  <div style={{marginTop: '16px'}} className="input__title">
                    Add new payment method
                    {payments.length > 0 && <div className="new__method" onClick={() => {
                      setUsingPayment(0);
                      setCardComplete({...cardComplete, cardHolder: 'f'});
                    }}>or select existing</div>}
                  </div>
                  {/* Payment form */}
                  <form onSubmit={handleSubmit}>
                    <div className="input__description">Card number</div>
                    <CardNumberElement
                      onChange={e => handleCard(e)}
                      className={(error !== '' && !cardComplete.cardNumber) ? 'input input--error stripe__input' : 'input stripe__input'}
                      options={options}
                    />
                    <div className="input__description">Card holder</div>
                    <input
                      value={cardComplete.cardHolder}
                      type="text"
                      className={(error !== '' && cardComplete.cardHolder === '') ? 'input input--error stripe__input' : 'input stripe__input'}
                      placeholder="John Doe"
                      onChange={e => setCardComplete({...cardComplete, cardHolder: e.target.value})}
                    />
                    <div className="input--full">
                      <div className="input--half">
                        <div className="input__description">Expiry</div>
                        <CardExpiryElement
                          onChange={e => handleCard(e)}
                          className={(error !== '' && !cardComplete.cardDate) ? 'input input--error stripe__input' : 'input stripe__input'}
                          options={options}
                        />
                      </div>
                      <div className="input--half">
                        <div className="input__description">CVV</div>
                        <CardCvcElement
                          onChange={e => handleCard(e)}
                          className={(error !== '' && !cardComplete.cardCvc) ? 'input input--error stripe__input' : 'input stripe__input'}
                          options={options}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              )
            }
            {/* Payment buttons */}
            <div className="payment-button__wrapper">
              <Link to="/">
                <div className="continue__shopping">
                  <img src={returnIcon} alt="" className="return__carot"/>
                  Continue Shopping
                </div>
              </Link>
              <button onClick={handleSubmit} className="button button--orange button--payment">
                {processing ? 'Processing Payment...' : 'Complete Order'}
              </button>
            </div>
            <div className="error__message">{error}</div>
          </div>
        )
      }
      </div>
  );
}

export default CheckoutInputs;