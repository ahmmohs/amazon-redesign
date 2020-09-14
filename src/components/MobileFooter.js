import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import ordersIcon from '../assets/orders.svg';
import cartIcon from '../assets/cart.svg';

import '../styles/footer.css';
import { useStateValue } from '../StateProvider';

function MobileFooter ({ setSidebar, sidebarOpen }) {
  const [{ totalQuantity, cart }] = useStateValue();

  return (
    <div className="footer">
    <Switch>
      <Route path={["/", "/orders", "/login"]} exact>
        <div className="mobile__footer">
          <Link to="/orders">
            <div className="footer__button">
              <img src={ordersIcon} alt="" className="footer__icon"/> Orders
            </div>
          </Link>
          <div className="footer__button bold" onClick={() => setSidebar(true)}>
            <img src={cartIcon} alt="" className="footer__icon"/>
            ${cart.reduce((a, b) => a + (b.price * b.count), 0).toFixed(2)}
            <div className="footer__cart--quantity">{totalQuantity}</div>
          </div>
        </div>
      </Route>
    </Switch>
    </div>
  )
}

export default MobileFooter;