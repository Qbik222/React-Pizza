import { CartItem } from '../redux/slices/cardSlice';

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((num, obj) => obj.price * obj.count + num, 0);
};
