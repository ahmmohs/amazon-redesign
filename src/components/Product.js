import React from 'react';

import '../styles/product.css';

import CircleButton from './Buttons/CircleButton';

import ratingStar from '../assets/star.svg';
import add from '../assets/add.svg';

/**
 * Product component
 * 
 * @param {props} props title, price, rating, image
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

export default Product;