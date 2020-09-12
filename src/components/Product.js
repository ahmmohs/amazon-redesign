import React from 'react';
import PropTypes from 'prop-types';

import '../styles/product.css';

import CircleButton from './Buttons/CircleButton';

import ratingStar from '../assets/star.svg';
import add from '../assets/add.svg';

const propTypes = {
  /** Product name */
  title: PropTypes.string.isRequired,
  /** Product price */
  price: PropTypes.number.isRequired,
  /** Product rating */
  rating: PropTypes.number.isRequired,
  /** Product image */
  image: PropTypes.string.isRequired,
}

const defaultProps = {
  title: "Product Title",
  price: "999.99",
  rating: 0,
  image: null,
}

/**
 * Product component
 * 
 */
function Product ({title, price, rating, image}) {

  return (
    <div className="product__wrapper">
      <div className="product__image__wrapper">
        <img src={image} alt="" className="product__image"/>
      </div>
      <div className="product__rating">
        {
          Array(rating).fill().map((_, i) => (
            <img src={ratingStar} alt="" className="rating__star" />
          ))
        }
      </div>
      <div className="product__title">{title}</div>
      <div className="product__info">
        <div className="product__price">{`$${price}`}</div>
        <CircleButton icon={add} text="Add to Cart" />
      </div>
    </div>
  );

}

Product.propTypes = propTypes;
Product.defaultProps = defaultProps;

export default Product;