import React from 'react';

function OrderProduct ({ image, title, price, quantity }) {
  return (
    <div className="table__row">
      <span>
        <div className="table__image__wrapper">
          <img src={image} alt="" className="table__image"/>
        </div>
      </span>
      <span>{title || 'Unknown'}</span>
      <span>{quantity || 'N/A'}</span>
      <span>${price || 'N/A'}</span>
      <span>${(price * quantity) || 'N/A'}</span>
    </div>
  )
}

export default OrderProduct;