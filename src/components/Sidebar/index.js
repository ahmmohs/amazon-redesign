import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';

import SidebarProduct from './SidebarProduct';
import Button from '../Buttons/Button';

import closeIcon from '../../assets/close_sidebar.svg';

import '../../styles/sidebar.css';

const propTypes = {
  /** If the sidebar is open */
  open: PropTypes.bool.isRequired,
  /** Function to control sidebar */
  setSidebar: PropTypes.func.isRequired,
}

/**
 * Sidebar cart display
 *  
 */
function Sidebar ({ open, setSidebar }) {
  const [{ cart }] = useStateValue();
  const history = useHistory();

  return (
    <div className={`sidebar ${open && 'sidebar--visible'}`}>
      <div className="sidebar__top">
        {/* Map Products in Cart */}
        <div className="sidebar__header">Your cart
          <div className="sidebar__icon__wrapper" onClick={() => setSidebar(!open)}>
            <img src={closeIcon} alt="" className="sidebar__icon" />
          </div>
        </div>
        {
          cart.map((item, i) => (
            <SidebarProduct
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              quantity={item.count}
              index={i}
            />
          ))
        }
      </div>
      <div className="sidebar__bottom">
        {/* Display total, checkout button */}
        <div className="sidebar__subtotal">
          <div className="subtotal__title">Subtotal: </div>
          <div>${cart.reduce((a, b) => a + (b.price * b.count), 0).toFixed(2)}</div>
        </div>
        <hr className="cart__divider" />
        <Button
          text="Checkout"
          color="orange"
          onClick={() => {
            history.push('/checkout');
            setSidebar(false);
          }}
        />
      </div>
    </div>
  );
}

Sidebar.propTypes = propTypes;

export default Sidebar;