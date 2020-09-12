import React from 'react'; 

import '../styles/landing.css';

import headerImg from '../assets/header.jpg';
import ProductSection from './ProductSection';

function Landing () {
  return(
    <div className="landing__wrapper">
      <img src={headerImg} alt="" className="header__image"/>
      <ProductSection category="hotDeals" title="Hot Deals" />
      <ProductSection category="recommended" title="Recommended for You" />
      <ProductSection category="bestSellers" title="Best Sellers" />
    </div>
  )
}

export default Landing;