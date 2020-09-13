import React from 'react';

import '../../styles/checkout.css';

import { useStateValue } from '../../StateProvider';
import { Link } from 'react-router-dom';

import CheckoutInputs from './CheckoutInputs';
import CheckoutProducts from './CheckoutProducts';

/**
 * Checkout page component
 * 
 */
function CheckoutPage () {
  const [{ user, cart }] = useStateValue();

  return (
    <div className="checkout__wrapper">
      {
        /* If the user is not signed in tell them to sign in */
        user ? (
          /* If the user has nothing in their cart, tell them its empty */
          (cart.length > 0) ? (
            <div className="checkout__container">
              {/* Left side: input form */}
              <CheckoutInputs />
              {/* Right side: checkout details */}
              <CheckoutProducts />
            </div>
          ) : (
            <div>
              Your shopping cart is empty!
            </div>
          )
        ) : (
          <div>
            Please<Link to="/login" className="signup__link">sign in</Link> to complete your checkout!
          </div>
        )
      }
    </div>
  );
}

export default CheckoutPage;