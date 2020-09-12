import React from 'react';
import PropTypes from 'prop-types'

const propTypes = {
  /** Text displayed on button */
  text: PropTypes.string.isRequired,
  /** Color of the button */
  color: PropTypes.string.isRequired,
  /** onClick function */
  onClick: PropTypes.func.isRequired,
}

/**
 * Regular button
 * 
 */
function Button ({text, color, onClick}) {
  return (
    <div className={`button button--${color}`} onClick={onClick}>
      {text}
    </div>
  );
}

Button.propTypes = propTypes;

export default Button;