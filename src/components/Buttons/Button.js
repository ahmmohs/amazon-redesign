import React from 'react';

/**
 * Regular button
 * 
 * @param {props} param0 text, color, isImage, image
 */
function Button ({text, color, isImage, image}) {
  return (
    <div className={`button button--${color}`}>
      {
        isImage ? (
          <img src={image} alt={text} className="button__img"/>
        ) : (
          text
        )
      }
    </div>
  );
}

export default Button;