import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /** Icon within button */
  icon: PropTypes.any.isRequired,
  /** Text displayed on label */
  text: PropTypes.string,
}

/**
 * Circle button
 * 
 */
function CircleButton ({icon, text}) {
  return (
    <div className="button--circle" aria-label={text}>
      <img src={icon} alt={text} className="button__img" />
    </div>
  );
}

CircleButton.propTypes = propTypes;

export default CircleButton;