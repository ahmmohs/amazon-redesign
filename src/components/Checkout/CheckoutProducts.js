import React, { useState } from 'react';

import SidebarProduct from '../Sidebar/SidebarProduct';

import { useStateValue } from '../../StateProvider';

function CheckoutProducts () {
  const [{ cart }, dispatch] = useStateValue();

  return (
    <div className="checkout__products">
      <div className="input__title" style={{marginBottom: '16px'}}>Products</div>
      {
        cart.map((item, i) => (
          <SidebarProduct
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            quantity={item.count}
          />
        ))
      }
      <hr className="cart__divider" />
      <div className="sidebar__subtotal">
        <div className="subtotal__title">Total: </div>
        <div>${cart.reduce((a, b) => a + (b.price * b.count), 0).toFixed(2)}</div>
      </div>
    </div>
  );
}

export default CheckoutProducts;