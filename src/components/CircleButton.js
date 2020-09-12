import React from 'react';

function CircleButton ({icon, text}) {

  return (
    <div className="button--circle" aria-label={text}>
      <img src={icon} alt={text} className="button__img" />
    </div>
  );

}

export default CircleButton;