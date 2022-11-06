import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setCategories } from '../redux/slices/filterSlice';

import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/Pizza-block/Pizza-block';
import Skeleton from '../components/Pizza-block/Skeleton';
import Categories from '../components/Categories/Categories';

const Home = ({ inputValue }) => {
  const categories = useSelector((state) => state.filter.categories);
  const sort = useSelector((state) => state.filter.sort);
  const dispatch = useDispatch();

  const onClickCategory = (id) => {
    dispatch(setCategories(id));
  };

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const order = sort.id.includes('-') ? 'asc' : 'desc';
  const sortBy = sort.id.replace('-', '');
  const search = inputValue ? `&search=${inputValue}` : '';
  console.log(inputValue);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://63625e1e66f75177ea2d7159.mockapi.io/items?${
          categories > 0 ? `category=${categories}` : ''
        }&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => setItems(res.data, setLoading(false)));
    window.scrollTo(0, 0);
  }, [categories, sort, order, sortBy, search, inputValue]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categories} changeCategories={(i) => onClickCategory(i)} />
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
    </div>
  );
};

export default Home;
