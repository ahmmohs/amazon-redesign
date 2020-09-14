import React, { useEffect, useState } from 'react';

import { useStateValue } from '../../StateProvider';
import { db } from '../../config/firebase';

import '../../styles/orders.css';
import Order from './Order';

function Orders () {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
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
      <div className="orders__container">
        <div className="orders__header">Your orders</div>
        {
          orders.map(order => (
            <Order
              order={order}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Orders;