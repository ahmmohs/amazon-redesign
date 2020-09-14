import React, { useEffect, useState } from 'react';

import { useStateValue } from '../../StateProvider';
import { db } from '../../config/firebase';

import Order from './Order';

import '../../styles/orders.css';

/**
 * Orders page component, display all previous orders
 * 
 */
function Orders () {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    /* If they are signed in get all their orders */
    if (user) {
      db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(orders => {
          setOrders(orders.docs.map(order => ({
            id: order.id,
            data: order.data()
          })))
        })
    }
  }, [user]);

  return (
    <div className="orders__wrapper">
      {/* If they are signed in display all their orders, or else tell them to sign in */}
      {
        user ? (
          <div className="orders__container">
            {/* Map orders if they have, or else tell them they have no orders */}
            <div className="orders__header">Your orders.</div>
            {
              orders.map(order => (
                <Order
                  order={order}
                />
              ))
            }
            {
              orders.length === 0 && 'You have not placed an order yet.'
            }
          </div>
        ) : (
          <div className="orders__container">
            <div className="orders__header">Sign in to view your orders.</div>
          </div>
        )
      }
    </div>
  )
}

export default Orders;