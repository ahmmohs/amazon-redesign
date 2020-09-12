import React from 'react'; 

import '../styles/landing.css';

import ProductSection from './ProductSection';

import headerImg from '../assets/header.jpg';

/**
 * Homepage landing component.
 *
 */
function Landing () {
  return(
    <div className="landing__wrapper">
      {/* Header */}
      <img src={headerImg} alt="" className="header__image"/>
      {/* Featured product sections */}
      <ProductSection category="hotDeals" title="Hot Deals" />
      <ProductSection category="recommended" title="Recommended for You" />
      <ProductSection category="bestSellers" title="Best Sellers" />
    </div>
  )
}

export default Landing;