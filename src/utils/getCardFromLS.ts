import CartItems from '../components/CartItems/cartItems';
import { CartItem } from '../redux/slices/cardSlice';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items: CartItem[] = data ? JSON.parse(data) : [];
  console.log(items);
  const totalPrice = calcTotalPrice(items);

  if (items.length) {
    return {
      items,
      totalPrice,
    };
  }
};
