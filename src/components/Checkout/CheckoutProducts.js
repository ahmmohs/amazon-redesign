import React from 'react';

import { useStateValue } from '../../StateProvider';

import SidebarProduct from '../Sidebar/SidebarProduct';

/**
 * Display products in cart @ checkout
 * 
 */
function CheckoutProducts () {
  const [{ cart }] = useStateValue();

  return (
    <div className="checkout__products">
      <div className="input__title" style={{marginBottom: '16px'}}>Products</div>
      {/* Map products */}
      {
        cart.map((item, i) => (
          <SidebarProduct
            key={i}
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            quantity={item.count}
          />
        ))
      }
      <hr className="cart__divider" />
      {/* Display total */}
      <div className="sidebar__subtotal">
        <div className="subtotal__title">Total: </div>
        <div>${cart.reduce((a, b) => a + (b.price * b.count), 0).toFixed(2)}</div>
      </div>
    </div>
  );
}

export default CheckoutProducts;