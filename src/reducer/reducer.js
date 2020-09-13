export const initialState = {
  cart: [],
  totalQuantity: 0,
  user: null,
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
      let newCart = [...state.cart];
      if (index >= 0 && state.cart.length > 0) {
        newCart.splice(index, 1);
        return {
          ...state,
          cart: newCart,
          totalQuantity: newCart.reduce((a, b) => a + (b.count), 0),
        }
      }
      return state;
    
    /** Empty cart */
    case 'EMPTY_CART':
      return {
        ...state,
        cart: [],
        totalQuantity: 0
      }

    /** Set the user */
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      }
    default:
      return state;
  }
}

export default reducer;