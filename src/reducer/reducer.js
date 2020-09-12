export const initialState = {
  cart: [],
  totalQuantity: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    /** Add new product to cart */
    case 'ADD_NEW_TO_CART':
      return {
        ...state,
        cart: [...state.cart, {...action.item, count: 1}],
        totalQuantity: state.totalQuantity + 1,
      }
    /** Add product already in cart */
    case 'ADD_DUP_TO_CART':
      state.cart[action.index] = action.item;
      return {
        ...state,
        totalQuantity: state.cart.reduce((a, b) => a + (b.count), 0),
      }
    /** Remove product from cart */
    case 'REMOVE_FROM_CART':
      const index = state.cart.findIndex((cartItem) => cartItem.id === action.id);
      console.log(index);
      if (index >= 0 && state.cart.length > 0) {
        let newCart = state.cart;
        return {
          ...state,
          cart: newCart.splice(index, 1),
          totalQuantity: newCart.reduce((a, b) => a + (b.count), 0),
        }
      }
      return state;
    default:
      return state;
  }
}

export default reducer;