import React from 'react';

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
  )

}

export default Button;