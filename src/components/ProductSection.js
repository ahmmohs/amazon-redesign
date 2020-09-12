import React from 'react';
import PropTypes from 'prop-types';

import Product from './Product';

import carot from '../assets/carot.svg';

const propTypes = {
  /** The category to make api call with */
  category: PropTypes.string,
  /** Title displayed on page */
  title: PropTypes.string.isRequired,
}

/**
 * Small product section used on Landing Page
 * 
 */
function ProductSection ({category, title}) {
  return (
    <div className="product__section">
      {/* Product Section Header */}
      <div className="section__header">
        <div className="section__title">{title}</div>
        <div className="section__more">
          Show All
          <img src={carot} alt="" className="section__carot"/>
        </div>
      </div>
      {/* Map products to row */}
      <div className="product__row">
        <Product
          id="1"
          title="Apple Airpods"
          price={129.99}
          rating={5}
          image="https://90a1c75758623581b3f8-5c119c3de181c9857fcb2784776b17ef.ssl.cf2.rackcdn.com/0606635_932897.jpg"
        />
        <Product
          id="2"
          title="Apple iPad"
          price={399.99}
          rating={4}
          image="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-cell-select-space-201909_GEO_US_FMT_WHH?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1567896857159"
        />
        <Product
          id="3"
          title="Apple iPhone"
          price={999.99}
          rating={3}
          image="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xr-black-select-201809?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1551226038992"
        />
        <Product
          id="4"
          title="Apple Macbook"
          price={1299.99}
          rating={5}
          image="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp13touch-space-select-202005?wid=892&hei=820&&qlt=80&.v=1587460552755"
        />
      </div>
    </div>
  );
}

ProductSection.propTypes = propTypes;

export default ProductSection;