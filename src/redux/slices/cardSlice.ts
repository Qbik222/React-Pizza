import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCardFromLS';

export type CartItem = {
  id: string;
  imageUrl: string;
  title: string;
  size: number;
  price: number;
  type: string;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const data = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice: data ? data.totalPrice : 0,
  items: data ? data.items : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const newItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );

      if (newItem) {
        console.log(newItem);
        newItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    reducePizzaCount(state, action: PayloadAction<CartItem>) {
      const newItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );

      if (newItem && newItem.count) {
        newItem.count--;
      }

      state.totalPrice = state.items.reduce((num, obj) => {
        if (!obj.count) {
          obj.count = 1;
          return obj.price * obj.count + num;
        } else {
          return obj.price * obj.count + num;
        }
      }, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      return;
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      const newArr = state.items.filter(
        (item) =>
          //ничего не подходит
          (item.size !== action.payload.size &&
            item.id !== action.payload.id &&
            item.type !== action.payload.type) ||
          //только тип
          (item.size !== action.payload.size &&
            item.id !== action.payload.id &&
            item.type === action.payload.type) ||
          //id и тип
          (item.size !== action.payload.size &&
            item.id === action.payload.id &&
            item.type === action.payload.type) ||
          //размер и тип
          (item.size === action.payload.size &&
            item.id !== action.payload.id &&
            item.type === action.payload.type) ||
          //только размер
          (item.size === action.payload.size &&
            item.id !== action.payload.id &&
            item.type !== action.payload.type) ||
          //размер и іd
          (item.size === action.payload.size &&
            item.id === action.payload.id &&
            item.type !== action.payload.type) ||
          //только id
          (item.size !== action.payload.size &&
            item.id === action.payload.id &&
            item.type !== action.payload.type),
      );

      state.items = [...newArr];

      state.totalPrice = state.items.reduce((num, obj) => {
        return obj.price * obj.count + num;
      }, 0);
    },
  },
});

export const { addItem, removeItem, clearCart, reducePizzaCount } = cartSlice.actions;

export default cartSlice.reducer;
