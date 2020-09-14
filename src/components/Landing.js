import React from 'react'; 

import ProductSection from './ProductSection';

import headerImg from '../assets/header.jpg';
import searchIcon from '../assets/search.svg';

import '../styles/landing.css';

/**
 * Homepage landing component.
 *
 */
function Landing () {
  return (
    <div className="landing__wrapper">
      {/* Header */}
      <img src={headerImg} alt="" className="header__image" />
      {/* Mobile search bar */}
      <div className="searchbar__wrapper--mobile">
        <input type="text" className="searchbar__input" placeholder="Search... (chargers, headphones, etc.)" />
        <div className="searchbar__button--mobile">
          <img src={searchIcon} alt="" className="searchbar__icon" />
        </div>
      </div>
      {/* Featured product sections */}
      <ProductSection category="hotDeals" title="Hot Deals" />
      <ProductSection category="recommended" title="Recommended for You" />
      <ProductSection category="bestSellers" title="Best Sellers" />
    </div>
  );
}

export default Landing;