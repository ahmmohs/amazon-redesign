import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /** The title of the saved payment/address */
  title: PropTypes.string.isRequired,
  /** The subtitle of the saved payment/address */
  subtitle: PropTypes.string,
  /** The description of the saved payment/address */
  description: PropTypes.string,
  /** Whats the currently selected method */
  currentlySelected: PropTypes.number.isRequired,
  /** Whats the index of **this** saved method */
  index: PropTypes.number.isRequired,
  /** What do we do when selected? */
  selectFn: PropTypes.func.isRequired
}

const defaultProps = {
  title: 'Example Method',
  subtitle: 'Visa',
  description: 'ending in 4242',
  currentlySelected: 0,
  index: 0,
  selectFn: () => {}
}

/**
 * Component used to display saved forms of payments or saved addresses.
 * 
 */
function SavedCheckoutInput ({ title, subtitle, description, currentlySelected, index, selectFn }) {
  return (
    <div
      className={`saved__method__wrapper ${(currentlySelected === index) && 'saved__method--active'}`}
      onClick={() => {
        selectFn(index);
      }}
    >
      <div className="method__title">{title}</div>
      <div className="method__description"><div className="bold">{subtitle}</div>{description}</div>
    </div>
  )
}

SavedCheckoutInput.propTypes = propTypes;
SavedCheckoutInput.defaultProps = defaultProps;

export default SavedCheckoutInput;