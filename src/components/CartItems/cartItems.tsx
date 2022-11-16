import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, reducePizzaCount, CartItem } from '../../redux/slices/cardSlice';
import { RootState } from '../../redux/store';
import clsx from 'clsx';

type CartItemsProps = {
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

const CartItems: React.FC<CartItemsProps> = ({ title, price, count }) => {
  const dispatch = useDispatch();
  const pizzas = useSelector((state: RootState) => state.cart.items);

  const onClickAddPizza = (pizza: CartItemsProps) => {
    dispatch(addItem(pizza as CartItem));
  };
  const onClickReducePizzaCount = (pizza: CartItemsProps) => {
    dispatch(reducePizzaCount(pizza as CartItem));
  };
  console.log(count);
  const onClickRemovePizza = (pizza: CartItemsProps) => {
    dispatch(removeItem(pizza as CartItem));
  };
  return (
    <div className="content__items">
      {pizzas.map((item) => {
        const { title, price, imageUrl, type, size, count } = item;
        return (
          <div className="cart__item">
            <div className="cart__item-img">
              <img className="pizza-block__image" src={imageUrl} alt={title} />
            </div>
            <div className="cart__item-info">
              <h3>{title}</h3>
              <p>
                {type}, {size} см.
              </p>
            </div>
            <div className="cart__item-count-wrapper">
              <div className="cart__item-count">
                <button
                  disabled={count <= 1}
                  onClick={() => onClickReducePizzaCount(item)}
                  className={clsx('button button--outline button--circle cart__item-count-minus', {
                    'btn-hide-count-remove': count === 1,
                  })}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                      fill="#EB5A1E"
                    />
                    <path
                      d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                      fill="#EB5A1E"
                    />
                  </svg>
                </button>
                <b>{count > 0 ? count : 1}</b>
                <div
                  onClick={() => onClickAddPizza(item)}
                  className="button button--outline button--circle cart__item-count-plus">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                      fill="#EB5A1E"
                    />
                    <path
                      d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                      fill="#EB5A1E"
                    />
                  </svg>
                </div>
              </div>
              <div className="cart__item-price">
                <b>{count > 0 ? price * count : price}₴</b>
              </div>
              <div onClick={() => onClickRemovePizza(item)} className="cart__item-remove">
                <div className="button button--outline button--circle">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                      fill="#EB5A1E"
                    />
                    <path
                      d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                      fill="#EB5A1E"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
