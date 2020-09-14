import React from 'react';

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

export default SavedCheckoutInput;