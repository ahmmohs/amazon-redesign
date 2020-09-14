import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import ordersIcon from '../assets/orders.svg';
import cartIcon from '../assets/cart.svg';

import '../styles/footer.css';
import { useStateValue } from '../StateProvider';

function MobileFooter () {
  const [{ totalQuantity, cart }] = useStateValue();

  return (
    <div className="footer">
      <div className="mobile__footer">
        <Switch>
          <Route path={["/", "/orders", "/login"]} exact>
            <Link to="/orders">
              <div className="footer__button">
                <img src={ordersIcon} alt="" className="footer__icon"/> Orders
              </div>
            </Link>
            <Link to="/cart">
              <div className="footer__button bold">
                <img src={cartIcon} alt="" className="footer__icon"/>
                ${cart.reduce((a, b) => a + (b.price * b.count), 0).toFixed(2)}
                <div className="footer__cart--quantity">{totalQuantity}</div>
              </div>
            </Link>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default MobileFooter;