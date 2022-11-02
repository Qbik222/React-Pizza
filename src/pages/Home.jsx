import React, { useEffect, useState } from 'react';

import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/Pizza-block/Pizza-block';
import Skeleton from '../components/Pizza-block/Skeleton';
import Categories from '../components/Categories/Categories';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('https://63625e1e66f75177ea2d7159.mockapi.io/items')
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {loading
          ? [...new Array(20)].map((_, i) => <Skeleton key={i} />)
          : items.map((obj) => {
              return <PizzaBlock {...obj} key={obj.id} />;
            })}
      </div>
    </>
  );
};

export default Home;
