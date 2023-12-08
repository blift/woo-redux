import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  cart: any[];
  total: number;
  totalItems: number;
}

const initialState: InitialState = {
  cart: [],
  total: 0,
  totalItems: 0
};


type Image = {
  id: number;
  src: string;
}

type CartItem = {
  id: number;
  name: string;
  price: string;
  images: Image[];
  quantity: number;
}

const cartSlice = createSlice({
  name: 'addToCart',
  initialState,
  reducers: {
    addToCart: (
      state, 
      action: PayloadAction<CartItem>
    ) => {

      if( state.cart.length === 0 ) {
        state.cart.push(action.payload);
      } else {
        const index = state.cart.findIndex((item) => item.id === action.payload.id);

        if( index === -1 ) {
          state.cart.push(action.payload);
        } else {
          state.cart[index].quantity += action.payload.quantity;
        }
      }

    },
    removeFromCart: (
      state, 
      action: PayloadAction<{id: number, quantity: number}>
    ) => {
      const index = state.cart.findIndex((item) => item.id === action.payload.id);

      if( index !== -1 ) {
        state.cart[index].quantity -= action.payload.quantity;

        if( state.cart[index].quantity === 0 ) {
          state.cart.splice(index, 1);
        }
      }
      
    },
    clearCart: (state ) => {
      state.cart = [];
    }
  }
});


export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;