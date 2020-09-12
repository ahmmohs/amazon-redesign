import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /** Icon within button */
  icon: PropTypes.any.isRequired,
  /** Text displayed on label */
  text: PropTypes.string,
  /** onClick function */
  onClick: PropTypes.func,
}

/**
 * Circle button
 * 
 */
function CircleButton ({icon, text, onClick}) {
  return (
    <div className="button--circle" aria-label={text} onClick={onClick}>
      <img src={icon} alt={text} className="button__img" />
    </div>
  );
}

CircleButton.propTypes = propTypes;

export default CircleButton;