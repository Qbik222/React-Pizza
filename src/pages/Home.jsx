import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategories, setFiltres } from '../redux/slices/filterSlice';
import { sortList } from '../components/Sort/Sort';

import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/Pizza-block/Pizza-block';
import Skeleton from '../components/Pizza-block/Skeleton';
import Categories from '../components/Categories/Categories';

const Home = ({ inputValue }) => {
  const categories = useSelector((state) => state.filter.categories);
  const sort = useSelector((state) => state.filter.sort);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearchRef = useRef(false);
  const isMounted = useRef(false);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPizzas = () => {
    setLoading(true);

    const order = sort.id.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.id.replace('-', '');
    const search = inputValue ? `&search=${inputValue}` : '';

    axios
      .get(
        `https://63625e1e66f75177ea2d7159.mockapi.io/items?${
          categories > 0 ? `category=${categories}` : ''
        }&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => setItems(res.data, setLoading(false)));
    window.scrollTo(0, 0);
  };

  const onClickCategory = (id) => {
    dispatch(setCategories(id));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.id === params.sortProperty);

      dispatch(setFiltres({ ...params, sort }));
      isSearchRef.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearchRef.current) {
      fetchPizzas();
    }

    isSearchRef.current = false;
  }, [categories, sort, inputValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.id,
        categories,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categories, sort, inputValue]);

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
