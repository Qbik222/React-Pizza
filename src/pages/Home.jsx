import React, { useEffect, useState } from 'react';

import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/Pizza-block/Pizza-block';
import Skeleton from '../components/Pizza-block/Skeleton';
import Categories from '../components/Categories/Categories';
const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState({
    name: 'популярное',
    id: 'rating',
  });
  let [categories, setCategories] = useState(0);
  const order = sort.id.includes('-') ? 'asc' : 'desc';
  const sortBy = sort.id.replace('-', '');
  console.log('render');
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://63625e1e66f75177ea2d7159.mockapi.io/items?${
        categories > 0 ? `category=${categories}` : ''
      }&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categories, sort, order, sortBy]);
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categories} changeCategories={(i) => setCategories(i)} />
        <Sort value={sort} changeSort={(i) => setSort(i)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {loading
          ? [...new Array(20)].map((_, i) => <Skeleton key={i} />)
          : items.map((obj) => {
              return <PizzaBlock {...obj} key={obj.id} />;
            })}
      </div>
    </div>
  );
};

export default Home;
