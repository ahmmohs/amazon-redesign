import React from 'react';
import PropTypes from 'prop-types';

import { useStateValue } from '../StateProvider';

import CircleButton from './Buttons/CircleButton';

import ratingStar from '../assets/star.svg';
import add from '../assets/add.svg';

import '../styles/product.css';

const propTypes = {
  /** Product ID */
  id: PropTypes.number.isRequired,
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
function Product ({id, title, price, rating, image}) {
  const [{ cart }, dispatch] = useStateValue();
  const index = cart.findIndex((cartItem) => cartItem.id === id); 

  /** Dispatches product data to reducer, with action ADD_TO_CART */
  const addToCart = () => {

    let item = {
      id,
      title,
      price,
      rating,
      image,
    }

    if (index >= 0) {
      dispatch({
        type: 'ADD_DUP_TO_CART',
        item: {...item, count: cart[index].count + 1},
        index: index,
      });
    } else {
      dispatch({
        type: 'ADD_NEW_TO_CART',
        item,
      });
    }
  }

  return (
    <div className="product__wrapper">
      {index >= 0 && (
        <div className="quantity__wrapper">
          {cart[index].count} in Cart
        </div>
      )}
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
        <CircleButton icon={add} text="Add to Cart" onClick={addToCart} />
      </div>
    </div>
  );
}

Product.propTypes = propTypes;
Product.defaultProps = defaultProps;

export default Product;