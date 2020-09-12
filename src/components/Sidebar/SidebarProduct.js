import React from 'react';
import PropTypes from 'prop-types';

import { useStateValue } from '../../StateProvider';

import removeIcon from '../../assets/remove.svg';

const propTypes = {
  /** Product ID */
  id: PropTypes.string.isRequired,
  /** Product image */
  image: PropTypes.any.isRequired,
  /** Product title */
  title: PropTypes.string.isRequired,
  /** Product price */
  price: PropTypes.number.isRequired,
  /** Product quantity */
  quantity: PropTypes.number.isRequired,
}

/**
 * Sidebar cart product container
 * 
 */
function SidebarProduct ({id, image, title, price, quantity}) {
  const [, dispatch] = useStateValue();

  /** Dispatches index to remove from cart */
  const removeFromCart = () => {
    console.log('dispatching!!');
    dispatch({
      type: 'REMOVE_FROM_CART',
      id,
    });
  }

  return (
    <div className="sidebar__product">
      <div className="sidebar__product--left">
        <div className="sidebar__image__wrapper">
          <img src={image} alt="" className="sidebar__image" />
        </div>
        <div className="sidebar__info">
          <div className="sidebar__title">{title} <span className="quantity">(x{quantity})</span></div>
          <div className="sidebar__subtitle">${price}</div>
        </div>
      </div>
      <div>
        <div className="sidebar__icon__wrapper" onClick={() => removeFromCart()}>
          <img src={removeIcon} alt="" className="sidebar__icon" />
        </div>
      </div>
    </div>
  );
}

SidebarProduct.propTypes = propTypes;

export default SidebarProduct;