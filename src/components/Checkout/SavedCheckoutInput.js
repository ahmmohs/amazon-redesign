import React from 'react';

function SavedCheckoutInput ({ title, description, currentlySelected, index, selectFn }) {
  return (
    <div
      className={`saved__method__wrapper ${(currentlySelected === index) && 'saved__method--active'}`}
      onClick={() => {
        selectFn(index);
      }}
    >
      <div className="method__title">{title}</div>
      <div className="method__description">{description}</div>
    </div>
  )
}

export default SavedCheckoutInput;