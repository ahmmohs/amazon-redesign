import React, { useState, useEffect, useRef } from 'react';

import { useStateValue } from '../StateProvider';
import useCheckMobile from '../utils/useCheckMobile';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { auth } from '../utils/firebase';

import logo from '../assets/logo.png';
import searchIcon from '../assets/search.svg';
import cartIcon from '../assets/cart.svg';
import returnIcon from '../assets/return.svg';
import userIcon from '../assets/user.svg';

/**
 * Navigation component.
 * 
 */
function Navbar ({ setSidebar, sidebarOpen }) {
  const [{ totalQuantity, user }] = useStateValue();
  const { isMobile } = useCheckMobile();
  const wrapper = useRef();
  const history = useHistory();

  const [dropdown, setDropdown] = useState(false);

  /** Sign in or out the user */
  const handleAuth = () => {
    if (user) {
      if (isMobile) {
        setDropdown(true);
      } else {
        auth.signOut();
      }
    } else {
      history.push('/login')
    }
  }

  const handleClickOutside = e => {
    if (wrapper.current.contains(e.target)) {
      return;
    }
    setDropdown(false);
  }

  useEffect(() => {
    if (isMobile) {
      document.addEventListener('mousedown', e => handleClickOutside(e));
      document.addEventListener('scroll', () => {setDropdown(false)});
    }
    return () => {
      console.log('Removing event lsitenr');
      document.removeEventListener('mousedown', e => handleClickOutside(e));
      document.removeEventListener('scroll', () => {setDropdown(false)});
    }
  }, [isMobile])

  return (
    <div className="navbar__wrapper">
      <div className="navbar">
        {/* Logo */}
        <Link to="/">
          <div className="nav__logo__wrapper">
            <img src={logo} alt="" className="nav__logo"/>
          </div>
        </Link>
        {/* Searchbar */}
        <div className="searchbar__wrapper">
          <input type="text" className="searchbar__input" placeholder="Search... (chargers, headphones, etc.)" />
          <div className="searchbar__button">
            <img src={searchIcon} alt="" className="searchbar__icon"/>
          </div>
        </div>
        {/* Desktop Links */}
        <div className="nav__links">
          <div className="nav__link" onClick={() => handleAuth()}>
            <div className="nav__link--small">Hello, {user?.displayName}</div>
            <div className="nav__link--bold">{user ? 'Sign out' : 'Sign in'}</div>
          </div>
          <div className="nav__link" onClick={() => history.push('/orders')}>
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
        {/* Mobile Links */}
        <div className="nav__links--mobile">
          <Switch>
            <Route path={["/orders", "/checkout", "/cart"]}>
              <div className="mobile__link">
                <img style={{marginRight: '2px'}} src={returnIcon} alt="" className="mobile__link--icon"/>
              </div>
            </Route>
          </Switch>
          <div className={`footer__button bold`} onClick={() => handleAuth()}>
            <img src={userIcon} alt="" className="footer__icon"/>
            {user ? user?.displayName : <div>Sign in</div>}
            <div className={`user__options ${dropdown && 'user__options--open'}`} ref={wrapper}>
              <div onClick={() => {
                auth.signOut();
                setDropdown(false);
              }} className="user__option">Sign out</div>
            </div>
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