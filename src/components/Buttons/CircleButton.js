import React from 'react';

/**
 * Circle button
 * 
 * @param {props} props icon, text
 */
function CircleButton ({icon, text}) {
  return (
    <div className="button--circle" aria-label={text}>
      <img src={icon} alt={text} className="button__img" />
    </div>
  );
}

export default CircleButton;