import React from 'react';

import logo from '../assets/logo.png';
import searchIcon from '../assets/search.svg';
import cartIcon from '../assets/cart.svg';

function Navbar () {
  return(
    <div className="navbar">
      <div className="nav__logo__wrapper">
        <img src={logo} alt="" className="nav__logo"/>
      </div>
      <div className="searchbar__wrapper">
        <input type="text" className="searchbar__input" />
        <div className="searchbar__button">
          <img src={searchIcon} alt="" className="searchbar__icon"/>
        </div>
      </div>
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
        <div className="nav__cart">
          <img src={cartIcon} alt="" className="nav__cart--icon"/>
          <div className="nav__cart--count">0</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;