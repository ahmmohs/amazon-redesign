import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import OrderProduct from './OrderProduct';

const propTypes = {
  /** Order details retrieved from the database */
  order: PropTypes.object.isRequired
}

/**
 * The order component. Displays an order details and contents.
 * 
 */
function Order ({ order }) {
  return (
    <div className="order__container">
      {/* Display order number and date on top */}
      <div className="order__top">
        <div>
          <div className="order__title">Order</div>
          <div className="order__number">#{order.id}</div>
        </div>
        <div>
          <div className="order__number" style={{color: '#232f3e'}}>Order Placed</div>
          <div className="order__number">{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</div>
        </div>
      </div>
      {/* Table of order items */}
      <div className="order__table">
        <div className="table__headings">
          <div className="table__row">
            <span />
            <span>Product</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Total</span>
          </div>
        </div>
        <div className="table__body">
          {
            order.data.cart?.map(item => (
              <OrderProduct
                image={item.image}
                title={item.title}
                price={item.price}
                quantity={item.count}
              />
            ))
          }
        </div>
      </div>
      {/* Order total */}
      <div className="order__total">
        Total: ${order.data.cart.reduce((a, b) => a + (b.price * b.count), 0).toFixed(2)}
      </div>
    </div>
  )
}

Order.propTypes = propTypes;

export default Order;