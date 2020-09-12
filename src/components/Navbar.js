import React from 'react';

import { useStateValue } from '../StateProvider';

import logo from '../assets/logo.png';
import searchIcon from '../assets/search.svg';
import cartIcon from '../assets/cart.svg';

/**
 * Navigation component.
 * 
 */
function Navbar({ setSidebar, sidebarOpen }) {
  const [{ totalQuantity }] = useStateValue();

  return(
    <div className="navbar__wrapper">
      <div className="navbar">
        {/* Logo */}
        <div className="nav__logo__wrapper">
          <img src={logo} alt="" className="nav__logo"/>
        </div>
        {/* Searchbar */}
        <div className="searchbar__wrapper">
          <input type="text" className="searchbar__input" />
          <div className="searchbar__button">
            <img src={searchIcon} alt="" className="searchbar__icon"/>
          </div>
        </div>
        {/* Links */}
        <div className="nav__links">
          <div className="nav__link">
            <div className="nav__link--small">Hello,</div>
            <div className="nav__link--bold">Sign in</div>
          </div>
          <div className="nav__link">
            <div className="nav__link--small">Returns</div>
            <div className="nav__link--bold">& Orders</div>
          </div>
          <div className="nav__link">
            <div className="nav__link--small">Your</div>
            <div style={{color: "#ff9d0c"}} className="nav__link--bold">Prime</div>
          </div>
          {/* Cart Information */}
          <div className="nav__cart" onClick={() => setSidebar(!sidebarOpen)}>
            <img src={cartIcon} alt="" className="nav__cart--icon"/>
            <div className="nav__cart--count">{totalQuantity}</div>
          </div>
        </div>
      </div>
      {/* Categories bar */}
      <div className="nav__categories">
        <div className="nav__category">Best Sellers</div>
        <div className="nav__category">Todays Releases</div>
        <div className="nav__category">Hot Deals</div>
        <div className="nav__category">Recommended</div>
        <div className="nav__category">Customer Service</div>
      </div>
    </div>
  );
}

export default Navbar;