import React from 'react';

import '../../styles/checkout.css';

import CheckoutInputs from './CheckoutInputs';
import CheckoutProducts from './CheckoutProducts';

/**
 * Checkout page component
 * 
 */
function CheckoutPage () {
  return (
    <div className="checkout__wrapper">
      <div className="checkout__container">
        {/* Left side: input form */}
        <CheckoutInputs />
        {/* Right side: checkout details */}
        <CheckoutProducts />
      </div>
    </div>
  );
}

export default CheckoutPage;